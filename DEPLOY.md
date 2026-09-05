# Tier 1 Deployment & Rollback Procedure

## Current production path
- Repository: `TheTrevorYoung/sierra-leone-health-systems`
- Branch: `main`
- Folder: `/ (root)`
- GitHub Pages URL: https://thetrevoryoung.github.io/sierra-leone-health-systems/
- Portfolio tier: **Tier 1 — Direct Publish**

## Controlling rule
The shared Portfolio Website Registry and locked Website Infrastructure, Deployment & Security Standard supersede the earlier bootstrap/ZIP deployment method.

Routine publishing is:

`bounded edit → local QA → direct GitHub commit → GitHub Pages main/root`

No Make scenario and no custom deployment Action are required for ordinary website publishing.

## Change discipline
Routine, low-risk solo edits may go directly to `main` after QA. Use a feature branch and pull request for material redesigns, sensitive public claims, risky integrations or multi-contributor work.

Each production change should be small enough to review and revert cleanly.

## Pre-publish QA
Run:
```bash
python scripts/qa.py
```

The QA checks internal links, headings, metadata, accessibility hooks, structured JSON, sitemap coverage, canonical/Open Graph URL consistency when present, 404 no-index behavior, and deployment/security hygiene.

## Rollback
If a production change breaks the site, revert to the last known-good Git commit. Do not reconstruct the old site manually and do not restore via a ZIP publishing loop.

## Custom-domain gate
Production domain is currently TBD. When an owned domain is attached:
1. update the Website Registry;
2. configure and verify DNS/HTTPS;
3. define the canonical host;
4. update canonical URLs, `og:url`, `robots.txt` and `sitemap.xml`;
5. rerun QA and verify all public routes.

## Public boundary
Keep `RESEARCH & CO-DESIGN PHASE` and the provider disclaimer in place. Do not add claims that the project is a licensed provider, government-approved program, Ministry/DHMT partner, authorized pilot, accredited network, insurer, confirmed referral network, or open patient service unless the corresponding documentary gate has closed.
