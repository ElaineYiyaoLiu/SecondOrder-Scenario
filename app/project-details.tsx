'use client';

export default function ProjectDetails({ zh }: { zh: boolean }) {
  return (
    <details className="project-details" onKeyDown={event => {
      if (event.key === 'Escape') {
        event.currentTarget.removeAttribute('open');
        event.currentTarget.querySelector('summary')?.focus();
      }
    }}>
      <summary><span>{zh ? '项目详情' : 'Project details'}</span><span className="details-chevron" aria-hidden="true">⌄</span></summary>
      <section className="project-details-panel" aria-label={zh ? 'Scenario 项目详情' : 'Scenario project details'}>
        <h2>Scenario</h2>
        {zh ? <p>这个模型把 AI 普及后的经济变化写成一个<strong>离散时间动态系统（discrete-time dynamical system）</strong>，逐年递推 AI 普及率、就业、收入、消费、利润和财富集中度。不同变量之间会持续反馈，让我们看到一个最初的变化怎样沿着经济系统传递，并在几年后产生更深一层的影响。</p> : <p>This model represents the economic effects of AI adoption as a <strong>discrete-time dynamical system</strong>, recursively updating adoption, employment, income, consumption, profits, and wealth concentration each year. Feedback between these variables lets us trace how an initial change moves through the economy and produces deeper effects several steps later.</p>}
      </section>
    </details>
  );
}
