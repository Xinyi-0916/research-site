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
  { id: 'generator-boundary', label: 'Generator boundary' },
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
  motivationLead: 'Modern 3D generation can produce visually convincing hair geometry, but render-ready geometry is not automatically a production-ready asset. Games and animation need compact, editable cards with valid surfaces, controlled overlap, and stable organization.',
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
      { label: 'Generator · in progress', title: 'Camera-aware variable-card 3D layout' },
      { label: 'Refiner · validated', title: 'Joint multiview K12 and profile correction' },
      { label: 'Output', title: 'Compact, editable, production-valid explicit cards' },
    ],
    roles: [
      {
        label: 'Generator · current F1 target',
        title: 'Discover the coarse card set',
        body: 'Up to 320 fixed queries predict existence, 3D anchors, orientation, length, width, and low-dimensional curvature. The same explicit quadratic cards are projected into every calibrated view.',
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
    evidenceBoundary: 'The pipeline above is the target system design. Population-scale evidence currently supports the frozen refiner; the generator remains under small-prototype development, so generator-only and post-refiner results are reported separately.',
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
    title: 'The target is production equivalence—not hidden-topology recovery',
    body: 'Exact artist count, roots, ownership, and layering are not uniquely observable from appearance. B2-S3 instead tests whether the refined outputs remain within real Train-GT production statistics, and finds no systematic out-of-distribution tail.',
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
