const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const cache = new Map();
function load(file) {
 const resolved = path.resolve(file);
 if(cache.has(resolved))return cache.get(resolved);
 const compiled=ts.transpileModule(fs.readFileSync(resolved,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 const module={exports:{}};cache.set(resolved,module.exports);
 new Function('require','module','exports',compiled)(p=>p.startsWith('.')?load(path.join(path.dirname(resolved),p+'.ts')):require(p),module,module.exports);
 return module.exports;
}
const m=load('lib/model.ts'),ws=load('lib/workspace.ts'),sc=load('lib/scenario.ts');
const original=ts.transpileModule(fs.readFileSync('tests/original-model.txt','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const old={exports:{}};new Function('exports',original)(old.exports);
for(const p of [m.defaults,...sc.presets.map(p=>p.params),{substitution:60,productivity:100,speed:25,ubi:2000,tax:40},{substitution:0,productivity:0,speed:0,ubi:0,tax:0}]){
 assert.deepEqual(m.simulate(p),old.exports.simulate(p),'default feedback must preserve all old results');
 assert(m.simulate(p,{feedback:false}).every(r=>Object.values(r).every(Number.isFinite)));
}
const scenarios=ws.initialScenarios();
const state={v:3,scenarios,active:'augmentation',compared:['slow','augmentation'],reference:'default',lang:'zh'};
assert.deepEqual(ws.decodeWorkspace(JSON.stringify(state)),state);
for(const bad of [{...state,compared:[]},{...state,reference:'missing'},{...state,active:'missing'},{...state,scenarios:[{...scenarios[0],params:{...m.defaults,ubi:-1}}]},{...state,scenarios:[{...scenarios[0],model:'future'}]},{...state,compared:['slow','slow']}])assert.equal(ws.decodeWorkspace(JSON.stringify(bad)),null);
const s=scenarios[1],metric='employment',year=10;
for(const r of ws.sensitivity(s,metric,year)) {
 assert.equal(r.a,m.simulate({...s.params,[r.key]:r.low})[year][metric]);
 assert.equal(r.b,m.simulate({...s.params,[r.key]:r.high})[year][metric]);
}
assert(ws.sensitivity({...s,params:{...m.defaults,substitution:0}},metric,year).every(r=>r.low>=0));
const target=m.simulate({...s.params,substitution:23.5})[year][metric];
const cross=ws.substitutionCrossing(s,metric,year,target);
assert.deepEqual(cross,{kind:'crossing',low:23,high:24});
assert.equal(ws.substitutionCrossing(s,metric,0,95).kind,'flat');
assert.equal(ws.substitutionCrossing(s,metric,10,1000).kind,'none');
assert.deepEqual(m.simulate({...m.defaults,speed:0}),m.simulate({...m.defaults,speed:0},{feedback:false}));
assert(m.simulate(s.params,{feedback:false})[10].employment!==m.simulate(s.params)[10].employment);
assert.equal(sc.parseQuestion('AI 自动化 40% 的工作').params.substitution,40);
assert.equal(sc.parseQuestion('AI productivity doubles').params.productivity,100);
assert.deepEqual(ws.scopeNotes('40% of junior accounting work by 2030'),{task:true,date:true,industry:true});
console.log('Passed: model parity, feedback counterfactual, sensitivity, crossing, validated storage and bilingual parsing.');

let serial=0;const id=()=>`backup-${++serial}`;
assert.deepEqual(ws.mergeWorkspace(state,state,id),state);
const changed={...scenarios[0],params:{...scenarios[0].params,substitution:42},name:'大陆迁移检查'};
const incoming={...state,scenarios:[changed],active:changed.id,compared:[changed.id],reference:changed.id};
const merged=ws.mergeWorkspace(state,incoming,id);assert.equal(merged.scenarios.length,state.scenarios.length+1);assert.equal(merged.active,'backup-1');assert.equal(merged.reference,'backup-1');assert.deepEqual(merged.compared,['backup-1']);assert.equal(merged.scenarios[0].params.substitution,scenarios[0].params.substitution);assert(ws.decodeWorkspace(JSON.stringify(merged)));
assert.equal(ws.mergeWorkspace(merged,incoming,id).scenarios.length,merged.scenarios.length);
const full={...state,scenarios:Array.from({length:30},(_,i)=>({...scenarios[0],id:`full-${i}`})),active:'full-0',compared:['full-0']};
assert.throws(()=>ws.mergeWorkspace(full,incoming,id),/cap/);assert.equal(full.scenarios.length,30);
console.log('Passed: backup round trip, collision remapping, repeated import, reference mapping, atomic scenario limit.');
fs.writeFileSync('../SecondOrder-import-check.json',JSON.stringify(incoming));

assert.equal(m.demandMultiplier(45),1);
assert(Math.abs(m.demandMultiplier(25.6)-0.8189333333333333)<1e-12);
assert.equal(m.demandMultiplier(0),0.65);
assert.equal(m.demandMultiplier(1000),1.4);
assert.equal(m.demandMultiplier(0,false),1);
for(const scenario of scenarios)for(const enabled of [true,false]){
 const rows=m.simulate(scenario.params,{feedback:enabled});
 for(let year=1;year<=10;year++){
  const expected=m.demandMultiplier(rows[year-1].consumption,enabled);
  assert(Math.abs(rows[year].output/(75*(1+scenario.params.productivity/100*rows[year].adoption))-expected)<1e-12);
 }
}
assert.equal(sc.parseQuestion('如果生产率提升 60%，每年 AI 普及速度为 20%，会怎样？').params.speed,20);
console.log('Passed: demand formula, bounds, feedback off, prior-year alignment and Chinese adoption matching.');
