# Xinyi Tang — Research Website

A single-page research website for **Production-Ready Hair-Card Generation and Refinement**.

Live site: <https://xinyi-0916.github.io/research-site/>

The layout uses a narrow personal/project sidebar and one continuous research page. The Portfolio link is intentionally prominent and points to the separate animation/art portfolio at <https://tangxinyi0903.weebly.com>.

## Evidence policy

The site does not use generated demonstration art or fabricated charts. Displayed refiner input/output files come from the complete population-validation render directories. The original PNGs remain unchanged; separate presentation copies replace only the exact uniform background RGB `(15, 15, 15)` with white `(255, 255, 255)`. Every non-background mesh pixel retains its original RGB:

```text
tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_j0_joint_oracle/
j0b1_h1_population_validation_v1_shard{0,1}_renders/
j0b1_h1_population_validation_v2_repair_6224181708507224014_renders/
```

Displayed population metrics are transcribed from the correctness-complete frozen artifact:

```text
tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_j0_joint_oracle/
j0b1_h1_population_validation_v2_complete.json
```

Production-distribution values and the generator correction-entry boundary are transcribed from:

```text
tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_j0_joint_oracle/
j0b2s3_absolute_production_distribution_v2_complete.json

tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_g0_generator/
g0_train_generator_entry_basin_v1.json
```

Public copies of the selected render files live under:

```text
public/media/eval/j0b1-h1-population-v2/
public/media/eval/j0b1-h1-population-v2-white/
```

When updating results, keep the artifact identifier and source case IDs traceable in the repository, and keep split labels and view names clear on the public page. Do not present a per-view render beside a case-level percentage without explaining that the percentage is aggregated over the split. Keep learned-generator and post-refiner claims separate.

The public demonstration uses the canonical input `front` and `right` (Side) views for every example. Its case-level input percentage is the relative reduction in the frozen six-view composite render error—not a percentage change in any one displayed channel metric.

## Edit content

All personal text, project statements, evaluation values, demonstration paths, generator-boundary values, findings, and limitations are in:

```text
src/data/siteData.js
```

The single-page structure is in `src/ResearchSite.jsx`; visual styling is in `src/styles.css`.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Production check:

```bash
npm ci
npm run build -- --mode github
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml` and updates GitHub Pages automatically.

## Portfolio reciprocal navigation

The Research site links prominently to the independent portfolio. In Weebly, add a navigation item called `Research ↗` pointing to:

```text
https://xinyi-0916.github.io/research-site/
```
