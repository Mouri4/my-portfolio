# Jhoncen A. Taulo: Portfolio (HTML / CSS / JS only)

## Files added or changed
- `index.html`, `style.css`: updated (search.js unchanged)
- `projects-data.js`: ALL project data + social links (edit this to update the site)
- `projects/<slug>/index.html`: one page per project (clean URL `/projects/<slug>/`)
- `js/router.js` (clean section URLs), `js/projects.js` (cards, search, filters), `js/contact.js` (form), `js/project-page.js`
- `css/project.css`, `404.html`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `cv/Jhoncen-Taulo-CV.pdf`

Copy everything into your existing portfolio folder (keep your `ceel-img/`, `icons/`, `src/` folders as they are).

## 1. Replace the placeholder address (SEO)
Search the whole project (Ctrl+Shift+F in VS Code) for `https://YOUR-USERNAME.github.io/YOUR-REPO`
and replace it with your real address, e.g. `https://jhoncen.github.io/portfolio`
(no trailing slash). It appears in `index.html`, `robots.txt`, `sitemap.xml` and every `projects/*/index.html`.

## 2. Publish on GitHub Pages
1. Create a GitHub repository and upload all files (the `index.html` must be in the root).
2. Repo > Settings > Pages > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`. Save.
3. After about a minute the site is live at `https://<username>.github.io/<repo>/`. HTTPS is on by default.
4. Optional custom domain: Settings > Pages > Custom domain, then add the DNS records GitHub shows.

## 3. Contact form (one-time activation)
The form sends through FormSubmit (free, no backend). Open your live site, send one test message,
then click the activation link FormSubmit emails to jhoncentaulo79@gmail.com. After that every message arrives in your inbox.
If sending ever fails, the form opens the visitor's email app as a fallback.

## 4. Social links
Open `projects-data.js`, fill `window.SOCIALS` (GitHub, LinkedIn, Facebook, Instagram).
Filled links appear in Contact and the footer; empty ones stay hidden.

## 5. Add or edit a project
1. Add an object to `window.PROJECTS` in `projects-data.js` (leave `url`, `github`, `demo`, `docs` as `''` if they do not exist).
2. Copy a folder in `/projects` (e.g. `brew-haven-campaign`) to `projects/<new-slug>/`, set `data-slug="<new-slug>"` on `<body>`, and update the title/description/canonical in its `<head>`.
3. Add the new URL to `sitemap.xml`.

## 6. Test after deploying (checklist)
Public URL opens over HTTPS; menu links and `/about`, `/projects`, `/contact` work; each project page opens;
search + category/type/year filters work; Download CV and View CV Online work; test form message received;
phone / tablet / desktop layouts; dark mode stays after refresh; no broken images (check the Network tab);
`/sitemap.xml` and `/robots.txt` open.

## Notes
- Clean section URLs on GitHub Pages use the standard `404.html` redirect trick. Direct visits to `/about` work, but GitHub reports
  those paths with a 404 status, so only `/` and the project pages are listed in `sitemap.xml`.
- Replace the CV with a newer PDF by overwriting `cv/Jhoncen-Taulo-CV.pdf`.
