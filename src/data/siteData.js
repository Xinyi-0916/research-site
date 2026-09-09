const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const site = {
  name: 'Xinyi Tang',
  shortName: 'XT',
  role: '3D AI & Graphics Research',
  identity:
    'Animation artist transitioning into 3D AI research, focused on production-ready generative 3D, structured character assets, and animation-aware representations.',
  portfolioUrl: 'https://tangxinyi0903.weebly.com',
  email: '',
  social: {
    github: 'https://github.com/Xinyi-0916',
    scholar: '',
    linkedin: '',
  },
  cv: {
    path: asset('/cv/xinyi-tang-cv.pdf'),
    available: false,
  },
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'Projects', path: '/projects' },
  { label: 'Publications', path: '/publications' },
  { label: 'About', path: '/about' },
  { label: 'CV', path: '/cv' },
]

export const pageCopy = {
  home: {
    perspectiveTitle: 'From visual output to usable asset',
    background:
      'My background is in Animation and CGT production, rather than a traditional computer science track. That background makes the production behavior of geometry—not only its rendered appearance—a first-class research question.',
    centralProblem:
      'Modern 3D generative models can produce visually convincing geometry, but render-ready assets are often far from production-ready assets.',
    domainAdvantage:
      'Practical experience with topology, editability, deformation, hair-card structure, rigging, and animation constraints provides the domain lens for this work.',
  },
  research: {
    intro: 'I study generative systems that reason about representation, structure, and downstream animation—not visual plausibility alone.',
    connectingQuestion:
      'Across these directions, I am interested in whether a generated asset remains compact, structured, editable, deformable, and compatible with the production stages that follow.',
  },
  projects: {
    intro: 'Detailed problem framing, current evidence, limitations, and research process—not only final demos.',
  },
  publications: {
    intro: 'Publication status is reported conservatively. Paper, arXiv, code, and video links will become active when those artifacts are public.',
  },
}

export const researchInterests = [
  {
    index: '01',
    title: 'Production-Ready Generative 3D',
    summary:
      'Moving from render-ready outputs toward usable assets with explicit topology, budgets, editability, collision behavior, and structure.',
    topics: ['Topology', 'Asset budgets', 'Editability', 'Collision', 'Structure'],
  },
  {
    index: '02',
    title: 'Animation-Ready Character Generation',
    summary:
      'Generation methods that account for edge flow, rigging, skinning, and deformation—not only static appearance.',
    topics: ['Edge flow', 'Rigging', 'Skinning', 'Deformation'],
  },
  {
    index: '03',
    title: 'Structured 3D Representations',
    summary:
      'Domain-specific production representations such as hair cards, semantic parts, and articulated assets.',
    topics: ['Hair cards', 'Semantic parts', 'Articulated assets'],
  },
  {
    index: '04',
    title: 'Generative Models for Graphics',
    summary:
      'Diffusion, flow matching, and structured generative models connected to practical graphics pipelines.',
    topics: ['Diffusion', 'Flow matching', 'Structured generation'],
  },
]

export const project = {
  slug: 'hair-card-generation-refinement',
  title: 'Production-Ready Hair-Card Generation and Refinement',
  shortTitle: 'Hair-Card Generation & Refinement',
  subtitle:
    'Direct explicit hair-card reconstruction and refinement from coarse geometry and multiview observations.',
  status: 'Ongoing research',
  year: '2026–2027',
  tags: ['Generative 3D', 'Differentiable Rendering', 'Hair Cards', 'Production Graphics'],
  hero: {
    before: asset('/media/placeholders/hair-before.svg'),
    after: asset('/media/placeholders/hair-after.svg'),
    beforeAlt: 'Placeholder for the coarse explicit hair-card input render',
    afterAlt: 'Placeholder for the production-constrained refined hair-card output render',
    caption:
      'Coarse input and constrained refinement. Replace both placeholders with matched-view project renders.',
  },
  motivation: {
    intro:
      'Modern image and 3D generation systems can produce visually plausible hair geometry. Some methods reconstruct dense strands first and convert them into cards afterward. Final game and animation assets, however, have a different set of requirements.',
    requirements: [
      'Compact card count and face budget',
      'Editable, explicit cards',
      'Stable card organization',
      'Valid ribbon surfaces',
      'Controlled overlap and duplication',
      'Animation-ready structure',
    ],
    finding: 'Appearance fidelity alone does not guarantee production validity.',
  },
  problem: {
    inputs: ['Coarse hair geometry', 'Multiview observations'],
    output: 'Compact explicit hair-card asset',
    objectives: ['Appearance fidelity', 'Production validity', 'Efficiency'],
    caveat:
      'The objective is not unique per-card ground-truth recovery: hidden card decomposition is non-identifiable from image evidence alone.',
  },
  keyFinding: {
    appearanceOnly: {
      title: 'Appearance-only joint optimization',
      result: 'Render quality improves strongly',
      failure:
        'Cards may expand, fold, migrate, overlap, or take over another card’s visible region.',
      image: asset('/media/placeholders/appearance-only.svg'),
      alt: 'Placeholder comparison showing structural shortcuts under appearance-only optimization',
    },
    constrained: {
      title: 'Production-constrained refinement',
      result: 'Strong multiview and held-out improvement is retained',
      failure: 'Intrinsic card surfaces remain valid under the current constraints.',
      image: asset('/media/placeholders/constrained.svg'),
      alt: 'Placeholder comparison showing valid cards after production-constrained refinement',
    },
  },
  pipeline: [
    'Coarse hair + multiview observations',
    'Coarse explicit card set',
    'Soft structural prior',
    'Joint differentiable rendering',
    'Production-valid refinement',
    'Final cards',
  ],
  formulation: [
    { label: 'Weak geometry', value: 'Soft prior' },
    { label: 'Production validity', value: 'Hard constraint' },
  ],
  hardValidity: [
    'Root preservation',
    'Valid ribbon surface',
    'Nondegenerate surface Jacobian',
    'Valid width and thickness',
    'Fixed card and face budget',
  ],
  results: {
    label: 'Validated · repaired 12-case oracle',
    metrics: [
      { value: '55.85%', label: 'Median input-view improvement' },
      { value: '44.93%', label: 'Median held-out-view improvement' },
      { value: '11 / 12', label: 'Cases improve on both' },
      { value: 'Maintained', label: 'Intrinsic H1 surface validity' },
    ],
    note:
      'Population-level visual correction is strong, while set-level card attribution, duplicate explanation, and overdraw remain active research problems.',
    populationStatus:
      'Population validation is continuing while H1 runtime correctness and set-level production ambiguity are being resolved. A complete production methodology is not yet claimed.',
  },
  comparison: {
    strandFirst: ['Images', 'Dense strands', 'Clustering', 'Cards'],
    ours: ['Coarse geometry + multiview', 'Compact cards', 'Constrained refinement'],
    statement:
      'By operating directly in the final production representation, the project aims to avoid dense strand reconstruction and reduce unnecessary intermediate complexity.',
  },
  researchTimeline: [
    {
      phase: 'Per-card direct regression',
      status: 'Did not hold',
      insight: 'Ambiguous correspondence prevents reliable unique card recovery.',
    },
    {
      phase: 'Appearance-only joint refinement',
      status: 'Partial signal',
      insight: 'Strong visual improvement exposed structural shortcuts.',
    },
    {
      phase: 'Weak-centered hard constraints',
      status: 'Too restrictive',
      insight: 'Safe optimization region excluded correct geometry.',
    },
    {
      phase: 'Production-valid formulation',
      status: 'Current finding',
      insight: 'Weak geometry becomes a soft prior; validity becomes a hard constraint.',
    },
    {
      phase: 'Set-level ownership and overdraw',
      status: 'Ongoing',
      insight: 'Resolving duplicate explanation and visible-region takeover.',
    },
  ],
  limitations: [
    'Card count, roots, and slots are currently oracle-provided.',
    'A complete variable-card generator is not yet finished.',
    'Set-level production validity remains an active research problem.',
    'Current refinement is iterative and not yet amortized.',
    'A fresh publication benchmark still needs to be established.',
  ],
  nextSteps: [
    'Set-level duplicate and ownership control',
    'Complete variable-card generator',
    'Learned or unrolled refiner',
    'Runtime and memory comparison against strand-to-card baselines',
    'Fresh evaluation benchmark',
  ],
  links: {
    paper: '',
    arxiv: '',
    code: 'https://github.com/Xinyi-0916/3D_Generation_refinement',
    video: '',
  },
}

export const upcomingProject = {
  title: 'Future research project',
  summary:
    'A second project in animation-aware 3D generation will be added here as the research direction develops.',
  image: asset('/media/placeholders/future-project.svg'),
  status: 'Planned',
}

export const publications = [
  {
    title: project.title,
    authors: 'Xinyi Tang',
    venue: 'Manuscript in preparation',
    year: '2026–2027',
    projectPath: `/projects/${project.slug}`,
    links: project.links,
  },
]

export const updates = [
  { date: '2026', text: 'Hair-card generation and refinement project ongoing.' },
  { date: '2026–2027', text: 'Manuscript in preparation.' },
]

export const about = {
  lead:
    'I come from an Animation / Computer Graphics Technology background, with production experience spanning modeling, topology, rigging, deformation, and digital asset workflows. I am transitioning into 3D AI and graphics research.',
  statement:
    'My animation background motivates research questions that are often missed by render-centric 3D generation: whether generated geometry is actually editable, deformable, compact, and usable in production.',
  education: [
    {
      title: 'Animation / Computer Graphics Technology',
      detail: 'Production-focused background',
      status: 'Add institution and degree details',
    },
  ],
  coursework: [
    { title: 'Purdue CS 176 — Data Engineering in Python', status: 'In progress' },
    { title: 'Linear Algebra', status: 'Planned · Spring 2027' },
  ],
}
