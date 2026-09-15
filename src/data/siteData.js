const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const person = {
  name: 'Xinyi Tang',
  initials: 'XT',
  role: '3D AI & Graphics Research',
  identity: 'Animation artist transitioning into 3D AI research, focused on production-ready generative 3D, structured character assets, and animation-aware representations.',
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
  { id: 'generator-boundary', number: '04', label: 'Generator' },
  { id: 'findings', number: '05', label: 'Research findings' },
  { id: 'limitations', number: '06', label: 'Limitations' },
]

export const project = {
  title: 'Production-Ready Hair-Card Generation and Refinement',
  subtitle: 'From a single character design image to a compact, editable set of explicit hair cards—without reconstructing dense strands or recovering the artist’s exact hidden topology.',
  status: 'Generator component evidence · refiner frozen',
  manuscript: 'Production-equivalent explicit asset reconstruction · 2026',
  centralObservation: 'Generate a compact, editable, production-valid hair-card asset from a single design image by using multiview consistency to infer geometry directly in explicit-card space.',
  motivation: 'Starting from a single design image, the system first obtains multiview observations—alpha, predicted surface normals, and calibrated cameras—then operates directly on explicit ribbon/card geometry through generation and refinement.',
  motivationLead: 'Current 3D generation can produce visually convincing hair geometry, but render-ready geometry is not automatically a production-ready asset. Games and animation need compact, editable cards with valid surfaces, controlled overlap, and stable organization.',
  targetDefinition: 'Recover any compact hair-card configuration that explains the observed and held-out appearance while satisfying geometric validity, card-budget, overlap, and production-distribution constraints—rather than requiring the one hidden layout originally authored.',
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
      body: 'Because the production target is already a set of ribbon surfaces, the project aims to avoid a dense-strand intermediate and solve generation, correspondence, and correction directly in card space.',
    },
  ],
  methodology: {
    status: 'Target system design · validated generator components · refiner frozen',
    steps: [
      { label: 'Input', title: 'Single character design image' },
      { label: 'Observation interface', title: 'Multiview alpha, predicted normals, and calibrated cameras' },
      { label: 'Generator · validated evidence', title: 'Fixed-128 camera-aware 3D geometry' },
      { label: 'Refiner · validated', title: 'Joint multiview K12 and profile correction' },
      { label: 'Output', title: 'Compact, editable, production-valid explicit cards' },
    ],
    roles: [
      {
        label: 'Generator · current validated evidence',
        title: 'Explicit-card geometry with a controlled fixed roster',
        body: 'A fixed set of 128 active quadratic cards isolates geometry optimization from count and topology changes. This controlled probe is used to test supervision, capacity, and renderer behavior before training the final variable-count generator.',
      },
      {
        label: 'Training / deployment boundary',
        title: 'Use geometry supervision without requiring it at inference',
        body: 'Training adds GT metric-depth render supervision for 3D placement and layer order. Inference remains limited to generated alpha, predicted normals, and camera parameters; coarse hair geometry is not a primary input.',
      },
      {
        label: 'Frozen B1/H1 refiner',
        title: 'Correct appearance inside a valid asset space',
        body: 'Joint rendering adjusts known-root, known-slot K12 cards and bounded profiles, rejects invalid H1 states, and restores the best feasible output while preserving count, roots, topology, and face budget.',
      },
    ],
    evidenceBoundary: 'The pipeline above is the target system design. Population-scale evidence supports the frozen refiner. Current generator evidence comes from fixed-card oracle and renderer audits—not a trained amortized F1—so generator-only and post-refiner results remain separate.',
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
  demonstrations: [
    {
      caseId: '1022113573246895015',
      label: 'Population case · near median input reduction',
      cards: '46 cards',
      reductions: { input: '53.98%', heldout: '55.63%' },
      pairs: [
        {
          view: 'Front',
          before: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/before_input_front.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/after_input_front.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/gt_input_front.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.572', after: '0.901' },
            { label: 'Depth MAE', before: '0.0430', after: '0.0302', unit: ' m' },
            { label: 'Normal cosine', before: '0.837', after: '0.866' },
          ],
        },
        {
          view: 'Side',
          before: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/before_input_right.png'),
          after: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/after_input_right.png'),
          gt: asset('/media/eval/j0b1-h1-population-v2-white/1022113573246895015/gt_input_right.png'),
          metrics: [
            { label: 'Alpha IoU', before: '0.484', after: '0.907' },
            { label: 'Depth MAE', before: '0.0416', after: '0.0182', unit: ' m' },
            { label: 'Normal cosine', before: '0.787', after: '0.900' },
          ],
        },
      ],
    },
    {
      caseId: '6224181708507224014',
      label: 'Correctness-closure case',
      cards: '44 cards',
      reductions: { input: '72.42%', heldout: '64.29%' },
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
    {
      caseId: '8174510361203308830',
      label: 'Strong held-out improvement',
      cards: '64 cards',
      reductions: { input: '77.28%', heldout: '74.61%' },
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
  ],
}

export const generatorBoundary = {
  status: 'Validated component evidence · fixed-128 explicit-card geometry',
  summary: 'The results below are the generator-side component checks that are ready to report: training-only depth utility, a controlled 128-card geometry budget, and renderer-gradient attribution. They support method decisions but are not presented as an end-to-end generator result.',
  f1: {
    input: 'Six-view alpha + predicted normal + calibrated cameras',
    output: 'Exactly 128 active explicit quadratic cards in the audited fixed-capacity geometry probe',
    variables: '3D placement, orientation, length, width, and low-dimensional curvature; one shared card set is rendered into every view',
    depth: 'GT metric depth is train-only render supervision; no depth map is required at inference',
    validated: 'GT-depth utility, fixed-capacity geometry, and renderer backward behavior have passed their scoped checks',
  },
  milestones: [
    {
      stage: 'Training signal',
      status: 'Pass',
      tone: 'pass',
      evidence: 'Adding GT metric depth lowers held-out depth MAE from 24.33 mm to 14.52 mm; paired median −10.04 mm (41.46%), better in 6/6 runs.',
      decision: 'Keep depth as training-only supervision; inference still uses alpha, predicted normals, and cameras.',
    },
    {
      stage: 'Fixed-card budget',
      status: '128 promoted',
      tone: 'pass',
      evidence: 'Against 64 cards, 128 cards improve missing area and depth in 6/6 pairs: paired medians −0.07542 and −4.74 mm. Depth-normal changes −0.03064.',
      decision: 'Use 128 only for the geometry probe; it is not the final predicted count.',
    },
    {
      stage: 'Renderer backward · V4',
      status: 'Pass',
      tone: 'pass',
      evidence: 'Stable, event, total-depth, and total-loss gradient signs are 100% at 0.001H; total-loss correlation is 0.997281.',
      decision: 'Renderer attribution is closed; the audited gradients now agree with the finite-difference reference.',
    },
  ],
  cardCounts: [
    { split: 'Train · non-zero', cases: '383', median: '46', p90: '117.6', p95: '148.3', max: '293' },
    { split: 'Validation · non-zero', cases: '49', median: '57', p90: '76.2', p95: '88.2', max: '95' },
  ],
  visuals: {
    depth: {
      title: 'Depth-supervision visual check',
      baseline: asset('/media/eval/generator/1065487795967695213_r0_normal_alpha.webp'),
      treatment: asset('/media/eval/generator/1065487795967695213_r0_normal_alpha_gt_depth.webp'),
      caption: 'Same Validation case and seed. Each unmodified eval sheet shows target alpha, final alpha, depth error, and depth-normal error for one input and one held-out view. This is evidence for the training-loss choice, not a final learned-generator result.',
    },
  },
  sources: [
    'hair_target500_g1_depth_utility_study_v1.json',
    'hair_target500_gt_card_count_audit_v1.json',
    'hair_target500_f1_v3_fixed_budget_sweep_v1.json',
    'hair_target500_f1_renderer_v4_event_residual_audit_v1.json',
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
  {
    label: 'Generator direction',
    title: 'Scoped component checks establish the next generator scaffold',
    body: 'Training-only metric depth improves held-out placement, 128 cards provide the stronger controlled geometry budget, and the audited renderer gradients agree with finite-difference references.',
  },
]

export const process = [
  ['Training supervision', 'GT metric depth provides a 41.46% paired median held-out depth improvement while remaining absent from deployment input.'],
  ['Fixed topology and capacity', 'Deterministic 64-card replay passed; a matched budget sweep then promoted 128 cards for controlled geometry experiments.'],
  ['Renderer attribution', 'V4 achieves 100% gradient-sign agreement for stable, event, total-depth, and total-loss probes at the primary audit scale.'],
]

export const limitations = [
  'B1/H1 still receives oracle card count, roots, slots/layout, and material/opacity assumptions.',
  'Generator evidence is currently component-level: fixed-card studies plus renderer audits; it is not presented as end-to-end quality.',
  'The current population evidence is limited to Target500 Validation; Test remains unread.',
  'The depth utility and fixed-card studies are small diagnostic experiments; they support method decisions rather than an end-to-end F1 quality claim.',
  'Generator component metrics and post-refiner metrics are reported separately because they come from different evidence scopes.',
]
