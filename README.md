# Xinyi Tang — Research Website

A single-page research website for the current C1 centerline study in
`3D_Generation_refinement`.

Live site: <https://xinyi-0916.github.io/research-site/>

## Current evidence boundary

The site presents the active C1 route only:

- 128 fixed root slots, all-one existence, and fixed slot identity;
- ordered K12 3D centerline generation;
- R3.4 per-case root movement as the promoted route;
- arc-length-weighted 3D and projected-curve coverage;
- R3.5 regional-scale/case-surface experiments as diagnostic, not promoted.

Coarse hair meshes, explicit-card refinement, width/orientation/profile learning,
and Test results are outside the current page. The head-focused visual check and
machine-readable audits remain in:

```text
tasks/aaai_3d_generation_20260626/evals/hair_target500_c1_r0_fixed_root_lattice/
```

The full artifact map is maintained in:

```text
tasks/aaai_3d_generation_20260626/REPORT_INDEX.md
```

## Visual evidence

The opening design-to-cards demonstration uses one real GT case
(`4503385273468617970`): the front design render, explicit-card alpha/normal
maps, and textured GT render. The gray panel is deterministic shading of the
stored GT card normals; it is not generated artwork.

The three C1 result cases are the highest Validation cases by 3D curve F1 at
`0.03H` in the promoted R3.4 `curve_coverage_result.json`. Their Front/Side
panels are rendered from the same checkpoint, GT centerlines, GT head/base,
camera contract, and GT hair-card render used by the head-focused evaluation.
Test remains unread.

## Edit content

All page copy and current metrics are in `src/data/siteData.js`. The page
structure is in `src/ResearchSite.jsx`; styling is in `src/styles.css`.

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
npm run build -- --mode github
```

## Deployment

Pushing to `main` runs `.github/workflows/deploy-pages.yml` and updates GitHub
Pages automatically.
