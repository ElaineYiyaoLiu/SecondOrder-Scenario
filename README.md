# SecondOrder analysis workspace

Bilingual English/Chinese scenario analysis built with Next.js. The V0.2 workspace includes local scenario persistence, duplication and naming, up to three comparison paths, selectable reference paths, annual inspection, absolute and relative charts, one-at-a-time sensitivity, a substitution crossing scan, inspectable mechanisms, and a demand-feedback counterfactual.

## Run

```
npm ci
npm run dev
npm run typecheck
npm run build
node tests/analysis.cjs
```

The build-memory-shim is only needed in constrained containers with unavailable process memory statistics. It is not used by Vercel.

## Storage and sharing

Saved runs use the versioned localStorage key `secondorder-workspace-v3`. Editing parameters does not change results until Run & save is pressed. Switching scenarios loads their last saved values. Storage failures are surfaced in the sidebar. No account or server database is connected.

Share analysis creates a URL fragment containing the saved active, compared and reference scenarios. Fragments are not sent to the server. Legacy V0.2 scenario links remain supported. All shared and stored values are validated against parameter bounds and model version before loading.

Reports download as standalone printable HTML, with assumptions, annual outcomes, sensitivity ranges and methodology. The report can be printed to PDF. CSV exports the annual results and assumptions of the compared scenarios. Reports and share links include saved runs, not unrun edits.

## Model

`lib/model.ts` preserves the original annual equations when demand feedback is enabled. The optional feedback switch holds the demand multiplier at 1. All figures are illustrative, normalized per household and not calibrated economic forecasts. Wealth concentration is an index, not a measured wealth share. Calendar years, industry and occupation are not modeled. Input review exposes recognized parameters and unsupported dimensions; text parsing is local and does not call an LLM.

Sensitivity varies one parameter at a time within bounded, explicitly shown ranges. It does not estimate probabilities or shares of variance. The crossing scan tests labor substitution at 1 percentage point intervals and reports the first bracket where the selected outcome intersects the reference. Saved runs retain model version `stylized-1.1`.

## Validation

`tests/analysis.cjs` verifies parity with the original model, feedback behavior, sensitivity calculations, crossing brackets, storage validation and bilingual parsing. Production rendering is verified through the local HTTP response. Browser verification of saved runs, duplication, comparison, share restoration, downloads, localization and responsive layout is pending deployment authorization.

## Release repositories

The current private release is `v0.2` in `secondorder-scenario-private`. The matching `secondorder-scenario-public` repository contains only `main` and is connected to Vercel for automatic production deployments at https://secondorder-scenario-public.vercel.app.
