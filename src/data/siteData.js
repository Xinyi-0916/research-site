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
  { id: 'refiner', label: 'Refiner I/O' },
  { id: 'results', label: 'Refiner results' },
  { id: 'demonstrations', label: 'Input / output' },
  { id: 'generator-boundary', label: 'Generator boundary' },
  { id: 'findings', label: 'Research findings' },
  { id: 'limitations', label: 'Limitations' },
]

export const project = {
  title: 'Production-Ready Hair-Card Generation and Refinement',
  subtitle: 'Direct explicit hair-card reconstruction from multiview observations, with a validated production-constrained refiner and a camera-aware generator now in progress.',
  status: 'Generator in progress · refiner frozen',
  manuscript: 'Methodology revision 020 · September 2026',
  centralObservation: 'Appearance fidelity alone does not guarantee production validity.',
  motivation: 'Modern 3D generators can produce visually convincing geometry, but render-ready assets are often far from production-ready assets. Game and animation pipelines need compact, editable cards with stable organization and intrinsically valid ribbon surfaces.',
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
  demonstrations: [
    {
      caseId: '1022113573246895015',
      label: 'Population case · near median input reduction',
      note: '46 cards · input 53.98% / held-out 55.63% error reduction',
      pairs: [
        { view: 'Input · front', before: asset('/media/eval/j0b1-h1-population-v2/1022113573246895015/before_input_front.png'), after: asset('/media/eval/j0b1-h1-population-v2/1022113573246895015/after_input_front.png') },
        { view: 'Held-out · oblique front-left', before: asset('/media/eval/j0b1-h1-population-v2/1022113573246895015/before_heldout_oblique_front_left.png'), after: asset('/media/eval/j0b1-h1-population-v2/1022113573246895015/after_heldout_oblique_front_left.png') },
      ],
    },
    {
      caseId: '6224181708507224014',
      label: 'Correctness-closure case',
      note: '44 cards · input 72.42% / held-out 64.29% error reduction',
      pairs: [
        { view: 'Input · front', before: asset('/media/eval/j0b1-h1-population-v2/6224181708507224014/before_input_front.png'), after: asset('/media/eval/j0b1-h1-population-v2/6224181708507224014/after_input_front.png') },
        { view: 'Held-out · oblique back-right', before: asset('/media/eval/j0b1-h1-population-v2/6224181708507224014/before_heldout_oblique_back_right.png'), after: asset('/media/eval/j0b1-h1-population-v2/6224181708507224014/after_heldout_oblique_back_right.png') },
      ],
    },
    {
      caseId: '8174510361203308830',
      label: 'Strong held-out improvement',
      note: '64 cards · input 77.28% / held-out 74.61% error reduction',
      pairs: [
        { view: 'Input · right', before: asset('/media/eval/j0b1-h1-population-v2/8174510361203308830/before_input_right.png'), after: asset('/media/eval/j0b1-h1-population-v2/8174510361203308830/after_input_right.png') },
        { view: 'Held-out · top', before: asset('/media/eval/j0b1-h1-population-v2/8174510361203308830/before_heldout_top.png'), after: asset('/media/eval/j0b1-h1-population-v2/8174510361203308830/after_heldout_top.png') },
      ],
    },
  ],
}

export const generatorBoundary = {
  status: 'F1 generator in progress · no learned F1 result claimed yet',
  summary: 'The generator must solve variable-card 3D layout before the frozen refiner is attached. It owns card existence, anchors, layout, and coarse shape because B1/H1 cannot create cards, move roots, or change slots.',
  formula: 'q_start = q_GT + f · (q_A7-OOF − q_GT)',
  largestSupported: 'f ≤ 1.0',
  scope: 'Train-only correction-entry audit · 7 cases · Validation and Test geometry unread',
  artifact: 'tasks/aaai_3d_generation_20260626/checkpoints/hair_target500_stage_g0_generator/g0_train_generator_entry_basin_v1.json',
  levels: [
    { factor: '0.5×', status: 'Pass', input: '71.39%', heldout: '62.16%', terminalInput: '0.0509', terminalHeldout: '0.0528' },
    { factor: '1.0×', status: 'Pass', input: '65.34%', heldout: '62.17%', terminalInput: '0.0725', terminalHeldout: '0.0677' },
    { factor: '1.5×', status: 'Fail', input: '61.59%', heldout: '49.76%', terminalInput: '0.0972', terminalHeldout: '0.0892' },
    { factor: '2.0×', status: 'Fail', input: '55.85%', heldout: '49.77%', terminalInput: '0.1228', terminalHeldout: '0.1187' },
    { factor: '3.0×', status: 'Fail', input: '56.99%', heldout: '48.96%', terminalInput: '0.1306', terminalHeldout: '0.2032' },
    { factor: '4.0×', status: 'Fail', input: '58.90%', heldout: '48.93%', terminalInput: '0.1862', terminalHeldout: '0.2708' },
  ],
  gates: [
    'At least 80% of cases improve on both input and held-out views',
    'Median reductions ≥ 30% input and ≥ 15% held-out',
    'Every initial and selected surface is H1-valid',
    'Terminal median errors are no worse than the same-case 1× repaired-A7 reference',
  ],
  f1: {
    input: 'Six-view alpha + predicted normal + calibrated cameras',
    output: 'Up to 320 active explicit quadratic ribbon cards',
    variables: 'Existence, 3D anchor, orientation frame, length, width, and 2D curvature',
    depth: 'GT metric depth is train-only render supervision; no depth map is required at inference',
    nextGate: 'Stable generator-only held-out 3D layout before K12/profile lifting or B1/H1 attachment',
  },
}

export const findings = [
  {
    label: 'Validated refiner',
    title: 'Population-scale visual correction with intrinsic validity maintained',
    body: 'Across all 49 card-bearing Validation cases, median error falls 53.98% on input views and 43.76% on independent held-out views. Every selected output is H1-valid.',
  },
  {
    label: 'Production audit',
    title: 'Refined outputs remain inside Train-GT production statistics',
    body: 'B2-S3 finds no systematic out-of-distribution tail in duplicate evidence, overlap, high-order overdraw, or intersection. This closes the earlier set-prior question for the frozen refiner.',
  },
  {
    label: 'Generator direction',
    title: 'The missing signal is coherent camera-aware 3D placement',
    body: 'Free-layout optimization can pass silhouette and production checks while failing strict held-out 3D. A controlled study found that train-only metric depth improves held-out depth in all 6/6 paired runs, motivating the current F1 design.',
  },
]

export const process = [
  ['Exact artist-root generator', 'Retired after the current deployable condition failed to identify hidden artist roots and multiplicity.'],
  ['Free-layout oracle', 'Reached a production-valid silhouette basin but exposed a strict held-out 3D deficit.'],
  ['Depth utility study', 'Train-only GT depth improved held-out depth MAE in 6/6 paired runs; normal remains a principal objective.'],
  ['Current F1', 'A camera-aware feed-forward generator is being developed around explicit quadratic cards and 320 fixed queries.'],
]

export const limitations = [
  'B1/H1 still receives oracle card count, roots, slots/layout, and material/opacity assumptions.',
  'The variable-card F1 generator and a learned/amortized refiner are not yet validated.',
  'The current population evidence is limited to Target500 Validation; Test remains unread.',
  'The depth utility study covers three Validation cases and two seeds, so it supports a loss-design choice rather than an F1 quality claim.',
  'Generator-only and post-refiner results must remain separate until coarse-card held-out 3D geometry is stable.',
]
