# SecondOrder Scenario

This is an interactive scenario-analysis tool for exploring how changes in technology, labor substitution, productivity, demand, and distribution can propagate through an economic system.

SecondOrder Scenario is built as a transparent sandbox rather than a forecasting product. Users can change assumptions, compare multiple paths, inspect model mechanisms, run sensitivity checks, and export their results.

## Live demo

https://secondorder-scenario.vercel.app/

## What it does

- Runs ten-year scenario paths from user-defined assumptions
- Compares multiple scenarios side by side
- Shows absolute and relative outcome changes
- Includes one-at-a-time sensitivity analysis
- Lets users inspect model mechanisms and demand feedback
- Supports local scenario saving, sharing, CSV export, and PDF reports

## Model scope

The model is intentionally stylized. Starting values and coefficients are illustrative rather than calibrated forecasts, and the outputs should be read as scenario comparisons rather than predictions.

The current model focuses on AI adoption, labor substitution, productivity, household income and consumption, company profit, government balance, and a stylized wealth-concentration index.

## Run locally

```bash
npm ci
npm run dev
```

For checks:

```bash
npm run typecheck
npm run build
node tests/analysis.cjs
```

## Storage

Saved scenarios stay in the browser using local storage. No user account or external database is required.

## Tech

Next.js, React, TypeScript, html2canvas, and jsPDF.
