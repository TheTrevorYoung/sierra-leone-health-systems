# Build QA — v0.1

Date: 2026-09-05

## Passed
- Internal-link validation across all HTML pages
- Exactly one H1 per HTML page
- Desktop horizontal-overflow check at 1440px
- Mobile horizontal-overflow check at 390px
- Homepage desktop render reviewed
- Homepage mobile render reviewed
- GitHub Pages relative-path compatibility
- Provider/research phase boundary retained in header/footer/content
- No patient portal, appointment flow, symptom checker, medical-advice form, insurance enrollment, health-record upload, clinical triage, or sensitive health-data intake

## Still required before public launch
- Final content/source review on every public factual claim
- Technical/expert review for high-stakes health-system interpretation where required
- Privacy/security review before connecting any live form or analytics service
- Production accessibility check
- Production metadata/canonical URL/sitemap check after repository/domain are known
- Final broken-link check after deployment
- Confirmation that the public phase remains RESEARCH & CO-DESIGN PHASE

## v0.2 content hardening

Added current reform status, comparison synthesis, financing baseline and expanded evidence metadata. Re-run automated QA before deployment.

## v0.2 deployment hardening
Automated QA also validates page titles/descriptions, `lang="en"`, skip links, structured JSON, absence of localhost/file URLs, and presence of `robots.txt`, `sitemap.xml`, and `.nojekyll`.
