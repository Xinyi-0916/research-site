const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const person = {
  name: 'Xinyi Tang',
  initials: 'XT',
  role: '3D AI & Graphics Research',
  identity: 'Researching compact, editable hair representations from multiview observations, with explicit geometry contracts and measurable 3D centerline coverage.',
  background: 'Animation and CGT production experience informs the geometry constraints: fixed slots, stable roots, valid surfaces, and a visual check that exposes geometry errors instead of hiding them.',
  portfolio: 'https://tangxinyi0903.weebly.com',
  github: 'https://github.com/Xinyi-0916',
  code: 'https://github.com/Xinyi-0916/3D_Generation_refinement',
}

export const overviewDemonstration = {
  title: 'From a front-view design to explicit hair-card geometry',
  note: 'A representative ground-truth case establishes the target representation. The gray and textured results below are two views of the same GT hair-card asset, not model predictions.',
  stages: [
    {
      label: 'Initial design input',
      detail: 'Single front-view character render',
      image: asset('media/c1/overview/initial-design-front.png'),
      alt: 'Front-view character design render used as the initial visual observation',
    },
    {
      label: 'GT card geometry',
      detail: '75 explicit cards · neutral gray shading',
      image: asset('media/c1/overview/gt-cards-gray.png'),
      alt: 'Ground-truth explicit hair-card geometry shown with neutral gray shading',
    },
    {
      label: 'GT textured cards',
      detail: 'The same explicit-card asset with source appearance',
      image: asset('media/c1/overview/gt-cards-textured.png'),
      alt: 'The same ground-truth explicit hair-card geometry with source texture appearance',
    },
  ],
}

export const sections = [
  { id: 'overview', number: '00', label: 'Overview' },
  { id: 'motivation', number: '01', label: 'Problem' },
  { id: 'methodology', number: '02', label: 'Methodology' },
  { id: 'refiner', number: '03', label: 'C1 evaluation' },
  { id: 'findings', number: '04', label: 'Findings' },
  { id: 'limitations', number: '05', label: 'Limitations' },
]

export const project = {
  title: 'Fixed-layout 3D Hair Centerline Generation',
  subtitle: 'A centerline-only geometry study that keeps the 128-slot scaffold fixed while testing small, auditable root adaptation.',
  status: 'C1 centerline-only · R3.4 promoted',
  manuscript: 'C1 geometry prototype · 2026',
  centralObservation: 'The current result is a fixed-layout 3D centerline generator: roots, count, existence, slot identity, width, orientation, and profile remain controlled while the ordered decoder is evaluated with 3D and projected curve coverage.',
  motivation: 'A convincing 2D projection does not prove that a centerline is correctly placed in 3D. The evaluation therefore separates root geometry, trajectory, camera-space depth, projected coverage, regional coverage, and tip coverage.',
  motivationLead: 'The active research question is deliberately narrow: can a fixed 128-slot scaffold generate centerlines that leave the head surface and follow the target flow without allowing the network to redesign the layout?',
  targetDefinition: 'Produce a compact, reproducible set of ordered 3D centerlines whose roots remain auditable and whose coverage is measured by arc length rather than line area or alpha overlap.',
  motivationPoints: [
    {
      label: 'Fixed contract',
      title: 'Layout is part of the experiment',
      body: 'There are exactly 128 slots, all-one existence, fixed slot identity, and a directed ordered decoder. Width, orientation, profile, and variable count are disabled in C1.',
    },
    {
      label: '3D evidence',
      title: 'Projected agreement is not enough',
      body: 'Curve-depth error and 3D distance-tube coverage are reported alongside input and held-out projected coverage so camera-ray mistakes do not disappear behind a good silhouette.',
    },
    {
      label: 'Geometry audit',
      title: 'Visual checks must expose failure modes',
      body: 'The current check uses GT head/base renders for occlusion and keeps centerline extensions visible. No coarse predicted mesh or hidden clipping mask defines the result.',
    },
  ],
  methodology: {
    status: 'Current C1 route · R3.4 promoted',
    steps: [
      { label: 'Input', title: 'Multiview alpha, normals, and calibrated cameras' },
      { label: 'Scaffold', title: 'R3.3 manual 128-slot canonical layout' },
      { label: 'R3.4', title: 'Per-case local tangent root move' },
      { label: 'Decoder', title: 'Ordered K12 3D centerline generator' },
      { label: 'Audit', title: '3D and projected curve coverage' },
    ],
    roles: [
      {
        label: 'Frozen geometry contract',
        title: 'Keep the question identifiable',
        body: 'Count, existence, slot identity, ordered decoding, width, orientation, and profile are frozen. R3.4 releases only two local root tangent residuals inside a Train-calibrated trust region.',
      },
      {
        label: 'Promoted route',
        title: 'R3.4 per-case root move',
        body: 'A hard projected head-surface candidate and proximal supervision on the first 20% of each curve improve coverage over the fixed-root baseline. Ear, face, and neck exclusions stay hard.',
      },
      {
        label: 'Diagnostic ablation',
        title: 'R3.5 case-surface follow-up is not promoted',
        body: 'Regional scale, depth/arc losses, and deterministic case-surface projection remain attribution experiments. The q0→q1 collapse and query-buffer mismatch explain why this route is not the active result.',
      },
    ],
    evidenceBoundary: 'The public page reports the C1 centerline prototype only. F1 coarse ribbons, explicit-card refinement, coarse hair meshes, width/orientation/profile learning, and Test results are outside the active C1 evidence boundary.',
  },
  refiner: {
    input: [
      'Fixed R3.3 128-slot root scaffold',
      'Multiview alpha, predicted normals, and calibrated cameras',
      'No coarse hair mesh or variable topology input',
    ],
    optimization: [
      'Ordered K12 centerline decoding',
      '3D curve and projected-curve objectives',
      'R3.4 local tangent root residual with hard surface candidate',
      'Proximal support loss on the first 20% of each curve',
    ],
    output: [
      '128 ordered 3D centerlines',
      'Fixed slot identity and all-one existence',
      'Curve coverage and regional/tip diagnostics',
    ],
    supervisionBoundary: 'GT head/base geometry and centerline samples are used for training and evaluation. They are not deployed inputs. The visual check uses GT head depth only to model occlusion; it does not clip points outside the head silhouette.',
    objective: {
      formula: 'L = L_set + L_T + L_proj + L_continuity + L_proximal',
      renderFormula: 'coverage = arc-length-weighted curve recall / precision / F1',
      terms: [
        {
          label: '3D curve',
          symbol: 'distance-tube recall / precision / F1',
          effect: 'Measures how much GT centerline arc length is within a fixed 3D tolerance of the prediction.',
        },
        {
          label: 'Projected curve',
          symbol: 'input + held-out 2D curve coverage',
          effect: 'Checks whether the same 3D curves remain aligned after camera projection.',
        },
        {
          label: 'Root support',
          symbol: 'proximal first-20% support loss',
          effect: 'Prevents a root from staying in the wrong place while the curve enters the target flow later.',
        },
      ],
      hardBoundary: 'No root reordering, deletion, hidden marker, variable count, coarse mesh, width, orientation, or profile change is allowed in the active C1 route. R3.4 root movement is bounded by the Train p90 support audit.',
    },
  },
}

export const evaluation = {
  artifact: 'hair_target500_c1_r3_4_root_move_surface_v2_20260917',
  source: 'tasks/aaai_3d_generation_20260626/checkpoints/hair_target500_c1_r3_4_root_move_surface_v2_20260917/',
  scope: '382 non-zero Train cases + 49 non-zero Validation cases · Test unread',
  elapsed: '12,000 training steps',
  aggregate: [
    { value: '128', label: 'Fixed slots · all-one existence' },
    { value: '21.87%', label: 'Validation 3D curve F1 @ 0.03H' },
    { value: '89.40%', label: 'Validation held-out 2D F1 @ 8 px' },
    { value: '0%', label: 'Backtracking / slot reorder' },
  ],
  checks: [
    ['Count / existence / identity', 'Pass · 128 / all 1 / fixed'],
    ['Train p90 trust radius', 'Pass · rmax = 0.0988766'],
    ['Root movement p100', 'Pass · Train 0.098784 / Val 0.097647'],
    ['Surface candidate distance', 'Pass · p100 < 2.1e-9'],
    ['Test split', 'Unread'],
  ],
  comparison: [
    ['Validation 3D recall / precision / F1 @ 0.03H', '26.84 / 18.45 / 21.87%', '22.07 / 17.18 / 19.32%'],
    ['Validation held-out 2D F1 @ 8 px', '89.40%', '83.46%'],
    ['Validation arc ratio mean / p50 / p95', '1.709 / 1.606 / 2.525', '1.643 / 1.500 / 2.534'],
    ['Validation tip recall', '20.24%', '23.27%'],
  ],
  r35: {
    status: 'Complete · not promoted',
    body: 'R3.5 reduces the median arc-length ratio but loses 3D and held-out coverage. The later case-surface audit finds a 0.155 mm median q0→q1 segment and a 24.39 mm serialized-root mismatch, supporting proximal collapse plus query-buffer serialization as the failure mode.',
  },
  bestCases: [
    {
      rank: '01',
      cards: 75,
      f1_3d: '44.06%',
      f1_input: '96.66%',
      f1_heldout: '98.55%',
      arcRatio: '1.151',
      views: [
        {
          label: 'Front',
          prediction: asset('media/c1/results/4503385273468617970/front-prediction.png'),
          target: asset('media/c1/results/4503385273468617970/front-gt.png'),
        },
        {
          label: 'Side',
          prediction: asset('media/c1/results/4503385273468617970/side-prediction.png'),
          target: asset('media/c1/results/4503385273468617970/side-gt.png'),
        },
      ],
    },
    {
      rank: '02',
      cards: 60,
      f1_3d: '42.69%',
      f1_input: '95.29%',
      f1_heldout: '95.11%',
      arcRatio: '1.378',
      views: [
        {
          label: 'Front',
          prediction: asset('media/c1/results/3126257232839355290/front-prediction.png'),
          target: asset('media/c1/results/3126257232839355290/front-gt.png'),
        },
        {
          label: 'Side',
          prediction: asset('media/c1/results/3126257232839355290/side-prediction.png'),
          target: asset('media/c1/results/3126257232839355290/side-gt.png'),
        },
      ],
    },
    {
      rank: '03',
      cards: 51,
      f1_3d: '41.23%',
      f1_input: '97.40%',
      f1_heldout: '97.09%',
      arcRatio: '1.788',
      views: [
        {
          label: 'Front',
          prediction: asset('media/c1/results/4790081704568370500/front-prediction.png'),
          target: asset('media/c1/results/4790081704568370500/front-gt.png'),
        },
        {
          label: 'Side',
          prediction: asset('media/c1/results/4790081704568370500/side-prediction.png'),
          target: asset('media/c1/results/4790081704568370500/side-gt.png'),
        },
      ],
    },
  ],
  links: [
    { label: 'Open C1 evaluation page', href: 'http://10.168.4.194:8765/hair_target500_c1_r0_fixed_root_lattice/' },
    { label: 'Read project README', href: 'https://github.com/Xinyi-0916/3D_Generation_refinement/blob/main/README.md' },
  ],
}

export const findings = [
  {
    label: 'Promoted result',
    title: 'R3.4 is the current C1 route',
    body: 'Per-case tangent root movement improves Validation 3D curve F1 to 21.87% and held-out projected F1 to 89.40% while keeping the 128-slot contract fixed.',
  },
  {
    label: 'Failure diagnosis',
    title: 'Case-surface projection is not the active solution',
    body: 'R3.5 can bring roots closer to a case scalp, but its proximal curve collapses near the surface and its checkpoint query buffer is inconsistent with the canonical-query declaration.',
  },
  {
    label: 'Metric decision',
    title: 'Centerline coverage is arc length',
    body: 'The formal metric uses distance-tube recall, precision, and F1 with arc-length weights, plus input/held-out projected coverage, regional recall, tip recall, and arc-length quantiles.',
  },
]

export const limitations = [
  'Test is unread; current numbers are Train/Validation diagnostics only.',
  'The predicted/GT arc-length tail remains high: R3.4 Validation mean/p50/p95 is 1.709 / 1.606 / 2.525.',
  'The C1 stage does not learn width, orientation, profile, variable count, or explicit-card surfaces.',
  'R3.5 case-surface geometry is retained for diagnosis, not as a promoted model or visual-quality claim.',
]
