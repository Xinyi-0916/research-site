const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const person = {
  name: 'Xinyi Tang',
  initials: 'XT',
  role: '3D AI & Graphics Research',
  identity:
    'Animation artist transitioning into 3D AI research, focused on production-ready generative 3D, structured character assets, and animation-aware representations.',
  background:
    'My Animation / CGT production background brings practical experience with modeling, topology, rigging, deformation, and production workflows.',
  portfolio: 'https://tangxinyi0903.weebly.com',
  github: 'https://github.com/Xinyi-0916',
  code: 'https://github.com/Xinyi-0916/3D_Generation_refinement',
}

export const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'method', label: 'Method' },
  { id: 'results', label: 'Results' },
  { id: 'demonstrations', label: 'Demonstrations' },
  { id: 'case-table', label: '12-case table' },
  { id: 'findings', label: 'Research findings' },
  { id: 'limitations', label: 'Limitations' },
]

export const project = {
  title: 'Production-Ready Hair-Card Generation and Refinement',
  subtitle:
    'Direct explicit hair-card reconstruction and refinement from coarse geometry and multiview observations.',
  status: 'Ongoing research',
  manuscript: 'Manuscript in preparation · 2026–2027',
  centralObservation:
    'Appearance fidelity alone does not guarantee production validity.',
  motivation:
    'Modern 3D generative models can produce visually convincing geometry, but render-ready assets are often far from production-ready assets. Game and animation pipelines need compact, editable cards with stable organization and valid ribbon surfaces.',
  problem: {
    input: ['Coarse hair geometry', 'Multiview observations'],
    output: 'Compact explicit hair-card asset',
    objectives: ['Appearance fidelity', 'Production validity', 'Efficiency'],
    boundary:
      'The target is not a unique per-card ground-truth decomposition: hidden card ownership is non-identifiable from image evidence alone.',
  },
  pipeline: [
    'Coarse hair + multiview',
    'Explicit card set',
    'Soft structural prior',
    'Differentiable rendering',
    'Hard validity checks',
    'Refined cards',
  ],
  validity: [
    'Root preservation',
    'Valid ribbon surface',
    'Nondegenerate surface Jacobian',
    'Valid width and thickness',
    'Fixed card and face budget',
  ],
}

export const evaluation = {
  artifact: 'j0b1_h1_repaired_12case_oracle_v2',
  source:
    'tasks/aaai_3d_generation_20260626/checkpoints/hair_target500_stage_j0_joint_oracle/j0b1_h1_repaired_12case_oracle_v2.json',
  scope: 'Repaired 12-case oracle · independent Blender evaluation',
  elapsed: '2,104.58 s',
  aggregate: [
    { value: '55.85%', label: 'Median input-view error reduction' },
    { value: '44.93%', label: 'Median held-out-view error reduction' },
    { value: '11 / 12', label: 'Cases improved on both splits' },
    { value: '12 / 12', label: 'Selected states surface-feasible' },
  ],
  checks: [
    ['Median input reduction ≥ 30%', 'Pass'],
    ['Median held-out reduction ≥ 15%', 'Pass'],
    ['At least 10/12 improve on both', 'Pass'],
    ['Selected H1 surface feasible for all', 'Pass'],
    ['Profile violations', '0'],
    ['Maximum root displacement', '0.0'],
  ],
  distribution: {
    input: { mean: '49.85%', p10: '26.48%', median: '55.85%', p90: '72.68%' },
    heldout: { mean: '38.76%', p10: '8.28%', median: '44.93%', p90: '61.65%' },
  },
  cases: [
    { id: '1027141227201743722', cards: 52, inputBefore: 0.5399, inputAfter: 0.1436, inputReduction: 73.41, heldoutBefore: 0.5859, heldoutAfter: 0.2775, heldoutReduction: 52.64, feasible: true },
    { id: '7761370645462552990', cards: 55, inputBefore: 0.4689, inputAfter: 0.1659, inputReduction: 64.62, heldoutBefore: 0.4099, heldoutAfter: 0.2187, heldoutReduction: 46.64, feasible: true },
    { id: '3266405811611944060', cards: 87, inputBefore: 0.4351, inputAfter: 0.1605, inputReduction: 63.11, heldoutBefore: 0.3620, heldoutAfter: 0.2056, heldoutReduction: 43.22, feasible: true },
    { id: '1074173863623961375', cards: 45, inputBefore: 0.4352, inputAfter: 0.4352, inputReduction: 0.00, heldoutBefore: 0.4160, heldoutAfter: 0.4160, heldoutReduction: 0.00, feasible: true },
    { id: '1065487795967695213', cards: 92, inputBefore: 0.3543, inputAfter: 0.1821, inputReduction: 48.60, heldoutBefore: 0.3474, heldoutAfter: 0.1757, heldoutReduction: 49.44, feasible: true },
    { id: '6678151772290067940', cards: 73, inputBefore: 0.3775, inputAfter: 0.1278, inputReduction: 66.15, heldoutBefore: 0.3442, heldoutAfter: 0.1286, heldoutReduction: 62.65, feasible: true },
    { id: '2061844726435307122', cards: 63, inputBefore: 0.3690, inputAfter: 0.2563, inputReduction: 30.55, heldoutBefore: 0.3605, heldoutAfter: 0.2863, heldoutReduction: 20.58, feasible: true },
    { id: '8761204452479506940', cards: 74, inputBefore: 0.4754, inputAfter: 0.2534, inputReduction: 46.69, heldoutBefore: 0.4355, heldoutAfter: 0.2480, heldoutReduction: 43.05, feasible: true },
    { id: '3354667489182854040', cards: 57, inputBefore: 0.4699, inputAfter: 0.1602, inputReduction: 65.91, heldoutBefore: 0.4179, heldoutAfter: 0.2110, heldoutReduction: 49.50, feasible: true },
    { id: '6270696799092075950', cards: 54, inputBefore: 0.5015, inputAfter: 0.3033, inputReduction: 39.53, heldoutBefore: 0.4068, heldoutAfter: 0.3308, heldoutReduction: 18.68, feasible: true },
    { id: '1115979378793808761', cards: 49, inputBefore: 0.5541, inputAfter: 0.4099, inputReduction: 26.03, heldoutBefore: 0.4980, heldoutAfter: 0.4625, heldoutReduction: 7.12, feasible: true },
    { id: '8174510361203308830', cards: 64, inputBefore: 0.5835, inputAfter: 0.1540, inputReduction: 73.61, heldoutBefore: 0.5087, heldoutAfter: 0.1444, heldoutReduction: 71.62, feasible: true },
  ],
  demonstrations: [
    {
      caseId: '6678151772290067940',
      label: 'Case 6678 · input views',
      note: '73 cards · aggregate input-view error reduction 66.15%',
      pairs: [
        { view: 'Front', before: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/before_input_front.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/after_input_front.png') },
        { view: 'Right', before: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/before_input_right.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/after_input_right.png') },
        { view: 'Held-out · oblique front-left', before: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/before_heldout_oblique_front_left.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/6678151772290067940/after_heldout_oblique_front_left.png') },
      ],
    },
    {
      caseId: '1027141227201743722',
      label: 'Case 1027 · observed + held-out',
      note: '52 cards · input 73.41% / held-out 52.64% error reduction',
      pairs: [
        { view: 'Input · front', before: asset('/media/eval/j0b1-h1-repaired-12case/1027141227201743722/before_input_front.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/1027141227201743722/after_input_front.png') },
        { view: 'Held-out · top', before: asset('/media/eval/j0b1-h1-repaired-12case/1027141227201743722/before_heldout_top.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/1027141227201743722/after_heldout_top.png') },
      ],
    },
    {
      caseId: '8174510361203308830',
      label: 'Case 8174 · strongest held-out reduction',
      note: '64 cards · aggregate held-out error reduction 71.62%',
      pairs: [
        { view: 'Held-out · top', before: asset('/media/eval/j0b1-h1-repaired-12case/8174510361203308830/before_heldout_top.png'), after: asset('/media/eval/j0b1-h1-repaired-12case/8174510361203308830/after_heldout_top.png') },
      ],
    },
  ],
}

export const findings = [
  {
    label: 'Validated in this artifact',
    title: 'Strong visual-error reduction with intrinsic validity maintained',
    body: 'The median reduction is 55.85% on input views and 44.93% on held-out views. Eleven of twelve cases improve on both, while every selected state passes the current H1 surface-feasibility checks.',
  },
  {
    label: 'Current finding',
    title: 'Image evidence can reward structurally wrong explanations',
    body: 'Appearance-only joint optimization can let cards expand, fold, migrate, overlap, or take over another card’s visible region. This motivates treating weak geometry as a soft prior and production validity as a hard constraint.',
  },
  {
    label: 'Ongoing research',
    title: 'Surface validity is not yet set-level production validity',
    body: 'Population-level visual correction is strong, while card attribution, duplicate explanation, ownership takeover, and overdraw remain unresolved at the set level.',
  },
]

export const process = [
  ['Per-card direct regression', 'Ambiguous correspondence prevented unique card recovery.'],
  ['Appearance-only joint refinement', 'Strong visual signal, but structural shortcuts appeared.'],
  ['Weak-centered hard constraints', 'Safe, but excluded correct geometry.'],
  ['Production-valid formulation', 'Weak geometry became a soft prior; intrinsic validity became hard.'],
  ['Current', 'Solving set-level ownership takeover and duplicate overdraw.'],
]

export const limitations = [
  'Card count, roots, and slots are currently oracle-provided.',
  'A complete variable-card generator is not yet finished.',
  'Set-level production validity remains under investigation.',
  'Current refinement is iterative and not yet amortized.',
  'A fresh publication benchmark still needs to be established.',
]
