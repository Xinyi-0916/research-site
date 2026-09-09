# Xinyi Tang — Research Website

An independent academic-style website for 3D AI and graphics research. It is intentionally separate from the animation/art portfolio at [tangxinyi0903.weebly.com](https://tangxinyi0903.weebly.com).

## Site structure

- `/` — research identity, selected work, and updates
- `/research` — research interests and connecting agenda
- `/projects` — current and planned projects
- `/projects/hair-card-generation-refinement` — full research case study
- `/publications` — manuscript status and future artifact links
- `/about` — animation/CGT background, education, and coursework
- `/cv` — view/download controls for the future CV PDF
- `Portfolio ↗` — external link to the independent Weebly portfolio

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
cd research-site
npm install
npm run dev
```

Open the local URL printed by Vite. To test the production build:

```bash
npm run build
npm run preview
```

## Content editing

All public research copy, project facts, results, publication status, links, education, and coursework live in:

```text
src/data/siteData.js
```

This keeps claims and metrics out of UI components. Keep the status distinctions precise:

- **Validated** — supported by the named current evaluation
- **Current finding** — observed and shaping the method
- **Ongoing** — actively unresolved
- **Planned** — future work, not a completed contribution

### Add a project

1. Add a project object in `src/data/siteData.js` (or split projects into their own data file as the list grows).
2. Add the project route to `src/App.jsx`.
3. Create the page under `src/pages/` and reuse the existing figure, status, and link components.
4. Put media in `public/media/projects/<project-slug>/` and use descriptive alt text.

### Update a publication

Edit `publications` and the matching project's `links` in `src/data/siteData.js`. Empty links render as disabled “soon” buttons. Do not change the venue status to submitted or under review without explicit evidence.

### Replace the CV

1. Add `public/cv/xinyi-tang-cv.pdf`.
2. Set `site.cv.available` to `true` in `src/data/siteData.js`.

### Replace project visuals

The expected filenames and usage notes are listed in `public/media/projects/hair-card-refinement/README.md`. SVGs in `public/media/placeholders/` are clearly marked placeholders and can be removed after replacement.

For MP4, use H.264 video with a poster image and keep the file compact. For GIF, provide an MP4 alternative when possible. The existing `BeforeAfter` component accepts matched image pairs and provides keyboard-accessible range control and captions.

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Set **Root Directory** to `research-site`.
3. Vercel detects Vite; use `npm run build` and output directory `dist` if prompted.
4. `vercel.json` includes the single-page route fallback.

### GitHub Pages

The repository workflow `.github/workflows/deploy-pages.yml` builds the site with the correct repository base path and adds a route fallback.

1. Commit and push the standalone website repository, including `package-lock.json`.
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Run the workflow or push to `main`.

The default Pages URL will be similar to:

```text
https://xinyi-0916.github.io/research-site/
```

## Portfolio reciprocal link

This repository does not modify the Weebly portfolio. In Weebly, add a prominent navigation item named `Research ↗` and point it to the deployed research-site URL after deployment.

## Before publishing

- Replace or approve the displayed name in `siteData.js`.
- Add contact and profile links if desired.
- Replace hero/comparison/result placeholders with approved research media.
- Add the final CV and enable its buttons.
- Update the OpenGraph URL/image after choosing the final domain.
- Confirm no unpublished, licensed, or confidential material is copied into `public/`.
