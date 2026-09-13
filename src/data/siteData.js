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
  { id: 'overview', label: 'Overview' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'results', label: 'Results' },
  { id: 'demonstrations', label: 'Input / output' },
  { id: 'generator-boundary', label: 'Generator progress' },
  { id: 'findings', label: 'Research findings' },
  { id: 'limitations', label: 'Limitations' },
]

export const project = {
  title: 'Production-Ready Hair-Card Generation and Refinement',
  subtitle: 'From a single character design image to a compact, editable set of explicit hair cards—without reconstructing dense strands or recovering the artist’s exact hidden topology.',
  status: 'Generator in progress · refiner frozen',
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
    status: 'Target system design · generator in progress · refiner frozen',
    steps: [
      { label: 'Input', title: 'Single character design image' },
      { label: 'Observation interface', title: 'Multiview alpha, predicted normals, and calibrated cameras' },
      { label: 'Generator · geometry gate', title: 'Fixed-128 camera-aware 3D layout' },
      { label: 'Refiner · validated', title: 'Joint multiview K12 and profile correction' },
      { label: 'Output', title: 'Compact, editable, production-valid explicit cards' },
    ],
    roles: [
      {
        label: 'Generator · current geometry gate',
        title: 'Prove the coarse card layout before scaling it',
        body: 'The current probe keeps exactly 128 active quadratic cards so card placement, support, and orientation can be tested without a changing roster. Variable existence—up to the final Q_max of 320—and full K12/profile prediction return only after this geometry gate passes.',
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
      'Six-view alpha, metric depth, and depth normals',
    ],
    optimization: [
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
  },
  validity: [
    'Fixed roots, card count, slots, and connectivity',
    'H1 intrinsic ribbon-surface validity',
    'Nondegenerate surface Jacobian',
    'Positive bounded width and thickness profiles',
    'Fixed card and face budget',
  ],
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
  status: 'F1 geometry gate in progress · amortized generator not yet trained',
  summary: 'The active F1 work now isolates a narrower question: can multiview alpha, predicted normals, and calibrated cameras determine a stable world-space layout of explicit cards? The probe fixes the roster at 128 cards until placement and orientation transfer to held-out views; card existence and the full variable roster remain deliberately deferred.',
  f1: {
    input: 'Six-view alpha + predicted normal + calibrated cameras',
    output: 'Exactly 128 active explicit quadratic cards for the current geometry probe',
    variables: '3D anchor, minimum-twist tilt frame, length, width, and low-dimensional curvature; one shared card set is rendered into every view',
    depth: 'GT metric depth is train-only render supervision; no depth map is required at inference',
    nextGate: 'A2′ depth + alpha + normal oracle: stable held-out placement and orientation before variable existence, K12/profile lifting, or B1/H1 attachment',
  },
  deferred: 'After the geometry gate passes, restore discrete existence over a variable roster up to Q_max = 320. Card count is the number of active queries; there is no separate count head.',
  currentQuestion: 'Does high-resolution camera-aware alpha/normal evidence provide the lateral, orientation, and ownership constraints that depth alone cannot?',
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
      decision: 'Renderer attribution is closed; remaining failure is a geometry-evidence problem.',
    },
    {
      stage: 'Anchor evidence · D + alpha',
      status: 'Local pass',
      tone: 'pass',
      evidence: 'Depth alone gives median per-card rank 1. Adding high-resolution alpha yields rank 3 for 254/256 blocks; median condition number is 3.67.',
      decision: 'Silhouette support supplies the lateral anchor directions missing from depth.',
    },
    {
      stage: 'Full SO(3) orientation · A2',
      status: 'Fail',
      tone: 'fail',
      evidence: '254/256 orientation blocks remain rank 2. The 128-card oracle records alpha IoU 0.3742, missing 0.0732, depth 29.53 mm, and depth-normal 0.1049.',
      decision: 'Roll is unobservable under the current evidence; do not scale this parameterization.',
    },
    {
      stage: 'Tilt-only orientation · A2′',
      status: 'Gate pass',
      tone: 'progress',
      evidence: 'The 2-DOF minimum-twist tilt has rank 2 in 256/256 blocks; median σ2/σ1 = 0.99999994 and P5 = 0.99999983.',
      decision: 'The paired A2′ depth + alpha + normal run is the current experiment.',
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
    diagnostics: [
      {
        title: 'Alpha recovers the missing anchor directions',
        image: asset('/media/eval/generator/hair_target500_f1_v4_gate_b_multimodal_rank_v1.png'),
        caption: 'Per-card local Jacobian audit: depth is mostly rank 1, while depth + high-resolution alpha is rank 3 for 254/256 audited blocks.',
      },
      {
        title: 'Why full 3-DOF orientation was rejected',
        image: asset('/media/eval/generator/hair_target500_f1_a2_orientation_v1.png'),
        caption: 'A2 is a diagnostic 128-card oracle, not a passed generator. Its orientation blocks are rank-2 dominated, identifying roll as the unobservable degree of freedom and motivating the current tilt-only A2′ gate.',
      },
    ],
  },
  sources: [
    'hair_target500_g1_depth_utility_study_v1.json',
    'hair_target500_gt_card_count_audit_v1.json',
    'hair_target500_f1_v3_fixed_budget_sweep_v1.json',
    'hair_target500_f1_renderer_v4_event_residual_audit_v1.json',
    'hair_target500_f1_v4_gate_b_multimodal_rank_v1.json',
    'hair_target500_f1_v4_gate_b1_conditioning_v1.json',
    'hair_target500_f1_a2_orientation_v1.json',
    'hair_target500_f1_a2_tilt_jacobian_v1.json',
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
    title: 'Depth is useful, but silhouette and orientation evidence are decisive',
    body: 'Depth-only anchor evidence saturates near rank 1 per card. High-resolution alpha recovers three anchor directions, while full SO(3) exposes an unobservable roll degree of freedom. The current A2′ probe therefore uses a minimum-twist, tilt-only frame with depth, alpha, and normal evidence.',
  },
]

export const process = [
  ['Exact artist-root generator', 'Retired after the current deployable condition failed to identify hidden artist roots and multiplicity.'],
  ['Fixed topology and capacity', 'Deterministic 64-card replay passed; a matched budget sweep then promoted 128 cards for the geometry probe.'],
  ['Renderer attribution', 'V4 matched stable and visibility-event finite differences, separating renderer-backward defects from the remaining placement floor.'],
  ['Multimodal geometry gate', 'High-resolution alpha restores anchor rank; full SO(3) fails because roll is unobservable, so the current A2′ experiment uses a 2-DOF tilt frame.'],
  ['Variable generator · next', 'Existence up to Q_max = 320, full K12/profile heads, amortization, and frozen-refiner attachment wait until strict held-out 3D and production gates pass.'],
]

export const limitations = [
  'B1/H1 still receives oracle card count, roots, slots/layout, and material/opacity assumptions.',
  'The variable-card F1 generator is not yet trained: current generator results are fixed-128 oracle and renderer/identifiability audits.',
  'The current population evidence is limited to Target500 Validation; Test remains unread.',
  'The depth utility, fixed-card, and A1/A2 studies are small diagnostic experiments; they support method decisions rather than an end-to-end F1 quality claim.',
  'Generator-only and post-refiner results must remain separate until coarse-card held-out 3D geometry is stable.',
]
