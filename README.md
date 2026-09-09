# Xinyi Tang — Research Website

A single-page research website for **Production-Ready Hair-Card Generation and Refinement**.

Live site: <https://xinyi-0916.github.io/research-site/>

The layout uses a narrow personal/project sidebar and one continuous research page. The Portfolio link is intentionally prominent and points to the separate animation/art portfolio at <https://tangxinyi0903.weebly.com>.

## Evidence policy

The site does not use generated demonstration art or fabricated charts. Displayed experiment images are unedited PNG files copied from:

```text
tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_j0_joint_oracle/
j0b1_h1_repaired_12case_oracle_v2_renders/
```

Displayed metrics and all 12 table rows are transcribed from the frozen artifact:

```text
tasks/aaai_3d_generation_20260626/checkpoints/
hair_target500_stage_j0_joint_oracle/
j0b1_h1_repaired_12case_oracle_v2.json
```

Public copies of the selected render files live under:

```text
public/media/eval/j0b1-h1-repaired-12case/
```

When updating results, keep the artifact identifier, case IDs, split labels, and view names visible. Do not present a per-view render beside a case-level percentage without explaining that the percentage is aggregated over the split.

## Edit content

All personal text, project statements, evaluation values, demonstration paths, full case table, findings, and limitations are in:

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
