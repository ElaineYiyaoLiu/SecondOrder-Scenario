import { defaults, simulate, type Params, type Metric } from './model';
import { controls, presets } from './scenario';

export const MODEL_VERSION = 'stylized-1.1';
export type Scenario = { id: string; name: string; question: string; params: Params; feedback: boolean; updated: string; model: string };
export type Workspace = { v: 3; scenarios: Scenario[]; active: string; compared: string[]; reference: string; lang: 'en'|'zh' };
export const STORAGE_KEY = 'secondorder-workspace-v3';
export const colors = ['#4261d7', '#279c86', '#b98533'];
export function initialScenarios(): Scenario[] {
 return presets.map(p=>({id:p.id,name:p.en,question:'',params:{...p.params},feedback:true,updated:'',model:MODEL_VERSION}));
}
export function validParams(x: unknown): x is Params {
 if (!x || typeof x !== 'object') return false;
 const p = x as Params;
 return controls.every(c=>Number.isFinite(p[c.key]) && p[c.key]>=c.min && p[c.key]<=c.max);
}
export function decodeWorkspace(raw: string): Workspace | null {
 try {
  const x=JSON.parse(raw) as Workspace;
  if(x.v!==3||!['en','zh'].includes(x.lang)||!Array.isArray(x.scenarios)||x.scenarios.length<1||x.scenarios.length>30) return null;
  if(!x.scenarios.every(s=>s&&typeof s.id==='string'&&s.id.length>0&&s.id.length<100&&!['default','no-ai'].includes(s.id)&&typeof s.name==='string'&&s.name.length<=100&&typeof s.question==='string'&&s.question.length<=600&&validParams(s.params)&&typeof s.feedback==='boolean'&&s.model===MODEL_VERSION&&typeof s.updated==='string'&&s.updated.length<50))return null;
  const ids=x.scenarios.map(s=>s.id);
  if(new Set(ids).size!==ids.length||!ids.includes(x.active)||!Array.isArray(x.compared)||x.compared.length<1||x.compared.length>3||!x.compared.every(id=>ids.includes(id))||new Set(x.compared).size!==x.compared.length||!['default','no-ai',...ids].includes(x.reference)) return null;
  return {v:3,lang:x.lang,active:x.active,compared:x.compared,reference:x.reference,scenarios:x.scenarios.map(s=>({...s,params:Object.fromEntries(controls.map(c=>[c.key,s.params[c.key]])) as Params}))};
 } catch {return null;}
}
export const perturbations: Record<keyof Params,number> = {substitution:5,productivity:10,speed:5,ubi:250,tax:5};
export function sensitivity(s:Scenario,metric:Metric,year:number,scale=1) {
 const center=simulate(s.params,{feedback:s.feedback})[year][metric];
 return controls.map(c=>{
  const low=Math.max(c.min,s.params[c.key]-perturbations[c.key]*scale), high=Math.min(c.max,s.params[c.key]+perturbations[c.key]*scale);
  const a=simulate({...s.params,[c.key]:low},{feedback:s.feedback})[year][metric];
  const b=simulate({...s.params,[c.key]:high},{feedback:s.feedback})[year][metric];
  return {key:c.key,low,high,a,b,center,span:Math.abs(b-a)};
 }).sort((a,b)=>b.span-a.span);
}
export function substitutionCrossing(s:Scenario,metric:Metric,year:number,target:number) {
 const points=Array.from({length:61},(_,n)=>({value:n,result:simulate({...s.params,substitution:n},{feedback:s.feedback})[year][metric]-target}));
 if(points.every(p=>Math.abs(p.result)<1e-8))return {kind:'flat' as const};
 const transitions=points.slice(1).flatMap((p,i)=>p.result*points[i].result<0||Math.abs(p.result)<1e-8?[{low:points[i].value,high:p.value}]:[]);
 if(Math.abs(points[0].result)<1e-8)transitions.unshift({low:0,high:0});
 return transitions.length?{kind:'crossing' as const,...transitions[0]}:{kind:'none' as const};
}
export function scopeNotes(q:string) {
 return {task:/task|work|任务|工作|automat|自动化/i.test(q),
 date:/(?:19|20)\d{2}/.test(q),
 industry:/account|legal|lawyer|software|health|retail|financ|junior|senior|会计|法律|软件|医疗|零售|金融|初级|高级/i.test(q)};
}
export function download(content:string,type:string,name:string) {
 const url=URL.createObjectURL(new Blob([content],{type}));
 const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
}

/** Merge a validated backup without overwriting existing scenarios. */
export function mergeWorkspace(current: Workspace, imported: Workspace, newId: () => string): Workspace {
 const scenarios=[...current.scenarios], ids=new Map<string,string>();
 for(const source of imported.scenarios){
  const existing=scenarios.find(s=>s.id===source.id);
  const same=(s:Scenario)=>s.name===source.name&&s.question===source.question&&s.feedback===source.feedback&&s.updated===source.updated&&s.model===source.model&&controls.every(c=>s.params[c.key]===source.params[c.key]);
  const identical=existing&&(same(existing)?existing:scenarios.find(same));
  if(identical){ids.set(source.id,identical.id);continue;}
  let id=source.id;
  while(scenarios.some(s=>s.id===id)||['default','no-ai'].includes(id))id=newId();
  scenarios.push({...source,id,params:{...source.params}});ids.set(source.id,id);
 }
 if(scenarios.length>30)throw new Error('cap');
 return {...current,scenarios,active:ids.get(imported.active)!,compared:imported.compared.map(id=>ids.get(id)!),reference:ids.get(imported.reference)||imported.reference};
}
