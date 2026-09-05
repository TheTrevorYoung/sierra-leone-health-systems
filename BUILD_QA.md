# Sierra Leone Health Systems — Build & Infrastructure QA

**Review date:** September 5, 2026  
**Website tier:** Tier 1 — Direct Publish  
**Repository:** `TheTrevorYoung/sierra-leone-health-systems`  
**Public URL:** https://thetrevoryoung.github.io/sierra-leone-health-systems/

## Registry alignment
The shared Portfolio Website Registry and locked Website Infrastructure, Deployment & Security Standard supersede the earlier ZIP/Make deployment method.

Verified:
- dedicated public repository;
- production branch `main`;
- GitHub Pages from `main` / root;
- direct GitHub repository metadata reads work, but direct connector writes remain blocked pending selected-repository GitHub App authorization;
- routine Make publishing is not required and remains prohibited by the Tier 1 default;
- a one-time Make administrative exception is being used only to apply this registry-alignment commit and retire the legacy ZIP deployment workflow;
- GitHub remains the authoritative website code/content source.

## Full static-site audit
Automated QA passes across **21 HTML files / 20 public routes**.

Validated:
- all internal links resolve;
- exactly one H1 per HTML page;
- titles and meta descriptions present;
- `lang="en"` and skip links present;
- sitemap covers every public route exactly once and excludes the 404 page;
- `robots.txt` points to the sitemap;
- 404 is `noindex` and uses project-root-safe links/assets;
- `evidence.json`, `model.json` and `claims.json` parse successfully;
- no forms, iframes, patient intake, authentication, payments or sensitive-data flows;
- no analytics/tracking currently installed;
- no external runtime JavaScript or stylesheet dependencies;
- external evidence links use HTTPS and protective `rel` attributes;
- no obvious committed credential markers or environment files;
- no localhost/file URLs in deployable HTML.

## Performance / complexity
The site remains deliberately lightweight: static HTML/CSS/JS, no framework build, no database, no image/video payload, and only minimal navigation JavaScript. Tier 1 remains the correct infrastructure classification.

## Remaining infrastructure gates
1. Add this repository to the selected-repository GitHub App write authorization and verify a direct bounded update.
2. The production domain remains **TBD**. When an owned domain is connected, update the Website Registry, DNS/HTTPS, canonical URLs, `og:url`, `robots.txt` and `sitemap.xml`, then rerun QA.

## Governance boundary
The site remains **RESEARCH & CO-DESIGN PHASE**. Infrastructure alignment does not authorize provider, clinical, government-partnership, insurance, pilot, referral-network or patient-enrollment claims.
