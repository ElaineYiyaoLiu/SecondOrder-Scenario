export const copy = {
  en: {
    eyebrow: 'A SMALL MODEL OF THE AI ECONOMY', title: 'What changes next?', intro: 'Change one assumption. Run ten years. See where the effects travel.',
    assumptions: 'Assumptions', scenario: 'Scenario', initial: 'Initial run', updated: 'Comparison run', run: 'Run comparison', rerun: 'Update comparison', reset: 'Reset',
    substitution: 'AI labor substitution', productivity: 'AI productivity gain', speed: 'AI adoption speed', ubi: 'Monthly UBI', tax: 'AI profit tax',
    substitutionHelp: 'Share of labor displaced at full adoption', productivityHelp: 'Output gain at full adoption', speedHelp: 'Share of remaining firms adopting each year', ubiHelp: 'Monthly payment per household; the annual amount is 12 times this value', taxHelp: 'Tax on AI-linked profit above baseline',
    tenYears: 'TEN YEAR PATH', compare: 'Compare outcomes', chart: 'Click a measure to inspect its path and mechanism.',
    employment: 'Employment', income: 'Household income', consumption: 'Consumption', profit: 'Company profit', balance: 'Government balance', concentration: 'Wealth concentration',
    year: 'Year', change: 'Change at year 10', why: 'Why this changed', first: 'Initial', second: 'Changed', baseline: 'Starting point',
    noChange: 'Adjust any control, then run a comparison to see the difference.',
    foot: 'An illustrative model for exploring assumptions, not a forecast.',
    model: 'How the model works', method: 'Three actors, six outcomes, ten annual steps. Firms adopt AI. Productivity and household demand affect output; substitution and productivity affect jobs. Wages, benefits and UBI shape consumption. Taxes and transfers shape the budget and concentration index.',
    equations: ['Adoption next year = adoption + speed × (1 − 0.45 × AI tax) × (1 − adoption)', 'Demand = 1 + 0.42 × (previous consumption / initial consumption − 1)', 'Jobs = initial jobs × demand × (1 − substitution × adoption) / (1 + 0.55 × productivity × adoption)', 'Household income = labor income + unemployment benefits + annual UBI + small profit dividend', 'Consumption = 75% of household income; annual balance = change in labor tax + AI tax − benefits − UBI'],
    limits: 'The coefficients and starting values are illustrative. Prices, migration, inflation, debt interest and new kinds of work are omitted. The wealth measure is an index, not a survey estimate. Change assumptions to examine the model, not to predict a date or country.',
    interpretation: 'Reading this result', loops: 'Feedback in the model', benefit: 'Changed assumption', trace: 'Year 0 → year 10', adopted: 'AI adoption', laborLabel: 'Labor income',
    loopText: 'Consumption affects next year’s demand. Demand then changes employment, income and consumption again.',
    reason: {employment: 'In this model, AI adoption reduces the labor needed per unit of output. Higher demand can partly offset the reduction.', income: 'Employment sets labor income. Benefits, UBI and a small dividend add to it.', consumption: 'Households spend 75% of their modeled income. That spending feeds next year’s demand.', profit: 'Output revenue minus labor and AI operating costs gives profit. The AI tax applies to gains above baseline.', balance: 'Changes in labor tax and AI tax add revenue; benefits and UBI add spending.', concentration: 'Profit gains raise the concentration index; benefits, UBI and AI tax lower it.'}
  },
  zh: {
    eyebrow: '一个关于 AI 经济的小模型', title: '接下来会发生什么？', intro: '改动一个假设，运行十年，看看影响会传到哪里。',
    assumptions: '模型假设', scenario: '场景', initial: '初始运行', updated: '对比运行', run: '运行对比', rerun: '更新对比', reset: '重置',
    substitution: 'AI 劳动替代率', productivity: 'AI 生产率提升', speed: 'AI 普及速度', ubi: '每月全民基本收入', tax: 'AI 利润税',
    substitutionHelp: '当 AI 全面普及时，被替代的劳动比例', productivityHelp: '当 AI 全面普及时，产出的提升幅度', speedHelp: '尚未采用 AI 的企业中，每年开始采用的比例', ubiHelp: '每户每月领取的金额，年度金额为其 12 倍', taxHelp: '对 AI 相关利润中超过初始水平的部分征税',
    tenYears: '十年变化', compare: '对比结果', chart: '点击一项指标，查看路径和计算原因。',
    employment: '就业率', income: '家庭收入', consumption: '家庭消费', profit: '企业利润', balance: '政府收支', concentration: '财富集中度',
    year: '第', change: '第十年的差值', why: '变化从何而来', first: '初始', second: '改动后', baseline: '起点',
    noChange: '调整任意参数，再运行一次，就能看到两个场景的差异。',
    foot: '本模型用于探索假设及其影响，不用于预测未来。',
    model: '模型如何运作', method: '模型包含家庭、企业和政府，逐年模拟十年的变化，展示六项主要结果。企业采用 AI；生产率和家庭需求影响产出；替代率和生产率影响就业。工资、救济与基本收入影响消费；税收和转移支付影响财政及财富集中指标。',
    equations: ['下一年采用率 = 当前采用率 + 速度 × (1 − 0.45 × AI 税率) × (1 − 当前采用率)', '需求 = 1 + 0.42 × (上年消费 / 初始消费 − 1)', '就业 = 初始就业 × 需求 × (1 − 替代率 × 采用率) / (1 + 0.55 × 生产率增幅 × 采用率)', '家庭收入 = 劳动收入 + 失业救济 + 年度基本收入 + 少量利润分红', '消费 = 家庭收入的 75%；年度财政差额 = 劳动税变化 + AI 税 − 救济 − 基本收入'],
    limits: '系数与初始值仅用于演示。模型没有计入价格、人口流动、通胀、债务利息或新职业。财富指标是模型指数，不是调查数据。调整假设是为了研究模型，不宜据此预测具体年份或国家。',
    interpretation: '如何读这次结果', loops: '模型中的反馈', benefit: '改动的假设', trace: '第零年 → 第十年', adopted: 'AI 采用率', laborLabel: '劳动收入',
    loopText: '消费影响下一年的需求。需求再影响就业和收入，随后又影响消费。',
    reason: {employment: '在模型中，采用 AI 会减少单位产出所需的劳动。需求增长可以部分抵消这一影响。', income: '就业决定劳动收入，失业救济、基本收入与少量分红也计入家庭收入。', consumption: '模型假设家庭将收入的 75% 用于消费，这会影响下一年的需求。', profit: '产出收入扣除劳动和 AI 运行成本后形成利润。AI 税只作用于高于初始水平的相关利润。', balance: '劳动税与 AI 税增加收入，救济和基本收入增加支出。', concentration: '利润增长推高集中度指标，救济、基本收入和 AI 税则使其降低。'}
  }
} as const;



