const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const person = {
  name: 'Xinyi Tang',
  initials: 'XT',
  role: '3D AI & Graphics Research',
  identity: 'Animation artist transitioning into 3D AI research, focused on production-ready geometry, structured character assets, and animation-aware representations.',
  background: 'My Animation / CGT production background brings practical experience with modeling, topology, rigging, deformation, and production workflows.',
  portfolio: 'https://tangxinyi0903.weebly.com',
  github: 'https://github.com/Xinyi-0916',
  code: 'https://github.com/Xinyi-0916/3D_Generation_refinement',
}

export const sections = [
  { id: 'overview', number: '00', label: 'Overview' },
  { id: 'motivation', number: '01', label: 'Motivation' },
  { id: 'methodology', number: '02', label: 'Methodology' },
  { id: 'refiner', number: '03', label: 'Refiner' },
  { id: 'findings', number: '04', label: 'Research findings' },
  { id: 'limitations', number: '05', label: 'Limitations' },
]

export const overviewDemonstration = {
  title: 'From a front-view design to editable hair cards',
  note: 'A visual preview of the intended output representation. This establishes the target asset format; the measured refiner results begin in Section 03.',
  stages: [
    {
      label: 'Initial design input',
      detail: 'Single front-view character render',
      image: asset('/media/overview/initial-design-front.png'),
      alt: 'Front-view character design used to illustrate the intended hair-card result',
    },
    {
      label: 'Hair-card geometry',
      detail: '75 explicit cards · 360° geometry turnaround',
      image: asset('/media/overview/hair-card-geometry-turnaround.gif'),
      alt: 'Turnaround of the intended explicit hair-card geometry in neutral gray shading',
    },
    {
      label: 'Cards with texture',
      detail: 'The same editable card asset with source appearance · 360° turnaround',
      image: asset('/media/overview/cards-with-texture-turnaround.gif'),
      alt: 'Turnaround of the intended explicit hair-card asset with texture',
    },
  ],
}

export const rendererDemonstration = {
  title: 'Authoritative renderer and loss maps',
  subtitle: 'One real front-view example from the frozen refiner evaluation · 64 explicit cards',
  stages: [
    {
      title: 'Explicit card ownership',
      detail: 'Frontmost card-ID map · 64 cards',
      image: asset('/media/methodology/8174510361203308830/card-ownership.png'),
      alt: 'Categorical frontmost-card ownership map for the selected 64-card hairstyle',
    },
    {
      title: '1024 native raster',
      detail: 'Frozen C2 front-view card render',
      image: asset('/media/methodology/8174510361203308830/native-rgb.png'),
      alt: 'Native 1024-pixel C2 raster of the selected hair-card asset',
    },
    {
      title: 'Exact alpha reduction',
      detail: '1024 → 512 area reduction',
      image: asset('/media/methodology/8174510361203308830/alpha-512.png'),
      alt: 'Exact 512-pixel reduced alpha map for the selected case',
    },
    {
      title: '512 metric depth',
      detail: 'Validity-weighted surface depth',
      image: asset('/media/methodology/8174510361203308830/metric-depth-512.png'),
      alt: 'Normalized visualization of the real 512-pixel metric-depth map',
    },
    {
      title: 'Depth-derived normal',
      detail: 'Computed after depth reduction',
      image: asset('/media/methodology/8174510361203308830/depth-normal-512.png'),
      alt: 'RGB visualization of normals derived from the reduced metric-depth map',
    },
  ],
  losses: [
    {
      title: 'Alpha',
      weight: '4×',
      detail: 'Full-image occupancy and silhouette coverage',
      image: asset('/media/methodology/8174510361203308830/alpha-512.png'),
      alt: 'Alpha supervision map',
    },
    {
      title: 'Edge / truncated SDF',
      weight: '2×',
      detail: 'Boundary-weighted silhouette alignment',
      image: asset('/media/methodology/8174510361203308830/edge-sdf-512.png'),
      alt: 'Edge weight map derived from the truncated signed distance field',
    },
    {
      title: 'Metric depth',
      weight: '2×',
      detail: 'Front/back placement and layer order',
      image: asset('/media/methodology/8174510361203308830/metric-depth-512.png'),
      alt: 'Metric-depth supervision map',
    },
    {
      title: 'Depth-derived normal',
      weight: '0.25×',
      detail: 'Local surface orientation',
      image: asset('/media/methodology/8174510361203308830/depth-normal-512.png'),
      alt: 'Depth-derived normal supervision map',
    },
  ],
  routeReasons: [
    'Rasterize thin card boundaries at 1024 before any loss-space reduction.',
    'Reduce alpha and validity-weighted metric depth with the exact C2 area operator.',
    'Derive orientation from the final 512 depth instead of downsampling a normal map directly.',
  ],
  safeguards: [
    {
      title: 'Alpha safeguard',
      body: 'The objective keeps the soft full-image alpha error and adds the frozen edge/SDF weight around the target boundary.',
    },
    {
      title: 'Normal safeguard',
      body: 'Target-valid support and its denominator stay fixed; four-neighbor validity and the 0.005 depth-continuity rule exclude silhouettes and depth jumps.',
    },
  ],
  provenance: 'All six panels come from the real front-view C2 maps for the displayed rank-1 Validation case. The page only crops and color-maps them for legibility; loss computation uses the uncropped stored values.',
}

export const project = {
  title: 'Production-Ready Hair-Card Refinement',
  subtitle: 'Refining weak explicit hair-card geometry into compact, editable, production-valid assets under multiview appearance and geometry supervision.',
  status: 'Refiner evidence · frozen evaluation',
  manuscript: 'Production-equivalent explicit asset refinement · 2026',
  centralObservation: 'Improve an existing explicit hair-card asset while preserving its roots, count, slot identity, connectivity, and face budget—and accept only outputs that remain intrinsically valid.',
  motivation: 'The refiner starts from weak coarse K12 cards and calibrated multiview observations, then jointly corrects card geometry and bounded profiles inside a fixed production-asset contract.',
  motivationLead: 'Visually plausible hair geometry is not automatically a production-ready asset. Games and animation need compact, editable cards with valid surfaces, controlled overlap, stable organization, and predictable topology.',
  targetDefinition: 'Recover a corrected hair-card configuration that better explains the observed and held-out appearance while preserving the input asset contract and satisfying intrinsic validity, overlap, and production-distribution checks.',
  motivationPoints: [
    {
      label: 'Production gap',
      title: 'Appearance is necessary, but not sufficient',
      body: 'A plausible render can still hide excessive card counts, folded or degenerate ribbons, duplicated coverage, unstable layering, or geometry that is difficult to edit and animate.',
    },
    {
      label: 'Ambiguous structure',
      title: 'The hidden card layout is not uniquely observable',
      body: 'The same hairstyle can be represented by different counts, roots, widths, overlaps, and local layerings. Reproducing the artist’s exact decomposition is therefore not the right acceptance target.',
    },
    {
      label: 'Direct representation',
      title: 'The final asset should remain explicit throughout',
      body: 'Because the production target is already a set of ribbon surfaces, the refiner solves correspondence and correction directly in card space without introducing a dense-strand intermediate.',
    },
  ],
  methodology: {
    status: 'Frozen refiner design and evaluation boundary',
    steps: [
      { label: 'Card-state input', title: 'Weak coarse root-fixed K12 card set' },
      { label: 'Observations', title: 'Multiview alpha, predicted normals, and calibrated cameras' },
      { label: 'Supervision', title: 'Target alpha plus training-only metric depth and normals' },
      { label: 'Refinement', title: 'Joint multiview K12 and bounded-profile correction' },
      { label: 'Output', title: 'Best-valid production-equivalent explicit cards' },
    ],
    roles: [
      {
        label: 'Fixed asset contract',
        title: 'Preserve the parts of the asset that define editability',
        body: 'Roots, card count, slot identity, connectivity, winding, and face budget remain fixed while geometry and bounded profiles are corrected.',
      },
      {
        label: 'Training / deployment boundary',
        title: 'Use geometry supervision without requiring it at inference',
        body: 'Metric depth and depth-derived normals provide optimization supervision only; they are not bundled with the deployed card-state input. Runtime observations remain alpha, predicted normals, and calibrated cameras.',
      },
      {
        label: 'Frozen B1/H1 refiner',
        title: 'Correct appearance inside a valid asset space',
        body: 'Joint rendering adjusts known-root, known-slot K12 cards and bounded profiles, rejects invalid H1 states, and restores the best feasible output while preserving count, roots, topology, and face budget.',
      },
    ],
    evidenceBoundary: 'Every quantitative result and input/output comparison on this page belongs to the frozen B1/H1 refiner evaluated on the complete Validation split.',
  },
  refiner: {
    input: [
      'Fixed card roster, slots, and root anchors',
      'Weak coarse root-fixed K12 cards',
      'Calibrated cameras; no depth map is part of the deployed asset input',
    ],
    optimization: [
      'Target alpha + GT-only geometry supervision: metric depth and depth-derived normals',
      'Joint composite rendering across the full card set',
      'Alpha + edge / truncated-SDF + depth + depth-normal losses',
      'Weak geometry as a robust soft prior',
      'Bounded width and thickness profile refinement',
    ],
    output: [
      'Best-valid refined explicit K12 cards',
      'Roots, count, slots, connectivity, and face budget unchanged',
      'Positive profiles and H1-valid ribbon surfaces',
    ],
    supervisionBoundary: 'The current population result is a per-case B1/H1 oracle optimization, so GT metric depth and depth-derived normals enter its objective as target supervision. They are not deployment inputs. In the intended learned system, GT depth is restricted to training and evaluation; deployed inference remains alpha + predicted normals + calibrated cameras.',
    objective: {
      formula: 'L = L_render + Σ_i λ_i ρ(ΔQ_i; Q_i⁰) + L_profile',
      renderFormula: 'L_render = λ_α L_α + λ_e L_edge + λ_d L_depth + λ_n L_normal',
      terms: [
        {
          label: 'Silhouette',
          symbol: 'λ_α L_α + λ_e L_edge',
          effect: 'Fills missing coverage and aligns the rendered boundary with the target.',
        },
        {
          label: 'Metric depth',
          symbol: 'λ_d L_depth',
          effect: 'Corrects front/back placement and layer order using GT-only supervision.',
        },
        {
          label: 'Depth normal',
          symbol: 'λ_n L_normal',
          effect: 'Aligns local surface direction instead of matching depth alone.',
        },
        {
          label: 'Structure + profile',
          symbol: 'Σ_i λ_i ρ(ΔQ_i; Q_i⁰) + L_profile',
          effect: 'Keeps corrections near the weak K12 geometry and widths/thicknesses within the bounded profile model.',
        },
      ],
      hardBoundary: 'H1 is this project’s name for the frozen intrinsic ribbon-surface validity gate—not an image metric or a loss. It rejects non-finite or degenerate surfaces, local loss of ribbon-surface rank, non-manifold connectivity or inconsistent winding, and invalid width/thickness profiles. Fixed roots/count/slots and the card/face budget are checked separately; only states passing all hard checks can be selected.',
    },
  },
}

export const evaluation = {
  artifact: 'j0b1_h1_population_validation_v2_complete',
  source: 'tasks/aaai_3d_generation_20260626/checkpoints/hair_target500_stage_j0_joint_oracle/j0b1_h1_population_validation_v2_complete.json',
  productionSource: 'tasks/aaai_3d_generation_20260626/checkpoints/hair_target500_stage_j0_joint_oracle/j0b2s3_absolute_production_distribution_v2_complete.json',
  scope: 'Complete 50-case Validation split · 49 card-bearing cases + 1 valid zero-card record',
  elapsed: '1,774.88 GPU-s',
  aggregate: [
    { value: '53.98%', label: 'Median input-view error reduction' },
    { value: '43.76%', label: 'Median held-out-view error reduction' },
    { value: '48 / 49', label: 'Card-bearing cases improved on both splits' },
    { value: '49 / 49', label: 'Selected outputs are H1-valid' },
  ],
  checks: [
    ['All card-bearing cases optimized', 'Pass'],
    ['Median input reduction ≥ 30%', 'Pass'],
    ['Median held-out reduction ≥ 15%', 'Pass'],
    ['Every selected surface H1-valid', 'Pass'],
    ['Profile violations', '0'],
    ['Root failures', '0'],
  ],
  distribution: {
    input: { mean: '52.28%', p10: '33.87%', median: '53.98%', p90: '70.66%' },
    heldout: { mean: '41.40%', p10: '18.52%', median: '43.76%', p90: '61.10%' },
  },
  distributionGuide: 'Each value summarizes the case-level composite error reduction across 49 card-bearing Validation cases. Mean is the arithmetic average; P10 is the 10th percentile (90% of cases are at least this high); Median is the 50th percentile; P90 is the 90th percentile (only 10% of cases are higher). Input aggregates the six optimization views, while Held-out uses three unseen Blender cameras. Higher is better.',
  production: {
    decision: 'PASS — Branch A',
    summary: 'The refined Validation outputs remain inside the absolute Train-GT production distribution; no additional set prior is justified by the current evidence.',
    rows: [
      ['Duplicate-pair tail · q99 exceedance', '0 / 49'],
      ['Near-coplanar duplicate area · q99 exceedance', '0 / 49'],
      ['Overdraw ≥ 3 · q99 exceedance', '0 / 49'],
      ['Persistent-overlap fraction · q99 exceedance', '1 / 49'],
    ],
  },
  metricDefinitions: [
    { name: 'Alpha IoU', description: 'Silhouette overlap between the rendered cards and target hair.', direction: '0–1 · higher is better' },
    { name: 'Depth MAE', description: 'Mean absolute metric-depth error on their shared solid foreground.', direction: 'metres · lower is better' },
    { name: 'Normal cosine', description: 'Surface-normal agreement on their shared solid foreground.', direction: '−1–1 · higher is better' },
  ],
  demonstrationSelection: 'These are the three highest-ranked card-bearing Validation cases by the arithmetic mean of input-view and held-out-view composite error reduction. The ranking uses all 49 card-bearing cases in the frozen artifact; every displayed output passes H1.',
  demonstrations: [
    {
      caseId: '8174510361203308830',
      label: 'Top combined result · rank 1',
      cards: '64 cards',
      reductions: { input: '77.28%', heldout: '74.61%', combined: '75.95%' },
      pairs: [
        {
          view: 'Front',
          before: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/before_input_front.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/after_input_front.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/gt_input_front.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.222', after: '0.730' },
            { label: 'Depth MAE', before: '0.0401', after: '0.0083', unit: ' m' },
            { label: 'Normal cosine', before: '0.382', after: '0.876' },
          ],
        },
        {
          view: 'Side',
          before: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/before_input_right.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/after_input_right.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/8174510361203308830/gt_input_right.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.253', after: '0.666' },
            { label: 'Depth MAE', before: '0.0232', after: '0.0049', unit: ' m' },
            { label: 'Normal cosine', before: '0.838', after: '0.962' },
          ],
        },
      ],
    },
    {
      caseId: '6171884197754545830',
      label: 'Top combined result · rank 2',
      cards: '52 cards',
      reductions: { input: '72.33%', heldout: '67.35%', combined: '69.84%' },
      pairs: [
        {
          view: 'Front',
          before: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/before_input_front.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/after_input_front.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/gt_input_front.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.419', after: '0.924' },
            { label: 'Depth MAE', before: '0.0384', after: '0.0164', unit: ' m' },
            { label: 'Normal cosine', before: '0.848', after: '0.917' },
          ],
        },
        {
          view: 'Side',
          before: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/before_input_right.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/after_input_right.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/6171884197754545830/gt_input_right.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.323', after: '0.912' },
            { label: 'Depth MAE', before: '0.0304', after: '0.0139', unit: ' m' },
            { label: 'Normal cosine', before: '0.802', after: '0.949' },
          ],
        },
      ],
    },
    {
      caseId: '6224181708507224014',
      label: 'Top combined result · rank 3',
      cards: '44 cards',
      reductions: { input: '72.42%', heldout: '64.29%', combined: '68.35%' },
      pairs: [
        {
          view: 'Front',
          before: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/before_input_front.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/after_input_front.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/gt_input_front.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.213', after: '0.810' },
            { label: 'Depth MAE', before: '0.0442', after: '0.0211', unit: ' m' },
            { label: 'Normal cosine', before: '0.688', after: '0.824' },
          ],
        },
        {
          view: 'Side',
          before: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/before_input_right.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/after_input_right.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/6224181708507224014/gt_input_right.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.288', after: '0.808' },
            { label: 'Depth MAE', before: '0.0422', after: '0.0210', unit: ' m' },
            { label: 'Normal cosine', before: '0.737', after: '0.865' },
          ],
        },
      ],
    },
  ],
}

export const findings = [
  {
    label: 'Validated refiner',
    title: 'Population-scale visual correction with intrinsic validity maintained',
    body: 'Across all 49 card-bearing Validation cases, median error falls 53.98% on input views and 43.76% on independent held-out views. Every selected output is H1-valid.',
  },
  {
    label: 'Production audit',
    title: 'The target is production equivalence—not hidden-topology recovery',
    body: 'Exact artist count, roots, ownership, and layering are not uniquely observable from appearance. B2-S3 instead tests whether the refined outputs remain within real Train-GT production statistics, and finds no systematic out-of-distribution tail.',
  },
]

export const limitations = [
  'B1/H1 still receives oracle card count, roots, slots/layout, and material/opacity assumptions.',
  'The current population evidence is limited to Target500 Validation; Test remains unread.',
]
