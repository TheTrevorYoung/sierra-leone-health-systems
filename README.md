# Sierra Leone Health Systems — Research & Co-Design Website

Initial static website build for the **Research & Co-Design Phase**.

## Public boundary
This is a health-systems research and public-learning website. It is **not** a healthcare provider, hospital, insurance, patient portal, clinical research enrollment site, or government program.

## Architecture
- Static HTML/CSS/JS
- No database dependency for ordinary content
- No sensitive health-data collection
- GitHub Pages ready (`.nojekyll` included)
- Relative links so the site works as a GitHub project page or at a custom domain
- Mobile-first and low-bandwidth oriented

## Key sections
- `/research/` — comparative health-system research
- `/sierra-leone/` — Sierra Leone baseline
- `/model/` — Model 0.x
- `/participate/` — structured participation architecture
- `/evidence/` — auditable source library
- `/pilot-pathway/` — future clinical readiness gates
- `/about/` — mission, methodology, corrections and boundaries

## Local preview
```bash
python -m http.server 8000
```
Open `http://localhost:8000/`.

## GitHub Pages
After creating the repository and adding these files, enable Pages from the `main` branch root (or use the repository’s Pages settings). No build framework is required.

## Content governance
All material claims should remain classified as one of:
- PUBLIC NOW
- PUBLIC WITH QUALIFIER
- INTERNAL ONLY
- PROHIBITED UNTIL GATE

Do not publish provider, licensing, government-partnership, pilot-authorization, insurance, referral-network, clinical-outcome or patient-enrollment claims before documentary gates close.

## Build v0.2 — evidence hardening

Added September 2026:
- Current Sierra Leone reform tracker
- Cross-model comparison matrix
- Current 2026 NHSSP / Health Benefit Package status
- 2023 National Health Accounts context on the financing page
- CHW policy implementation anchors
- Expanded evidence registry and current-policy compatibility checks

The site remains a research-and-co-design platform, not a clinical service.

### Build v0.2 deployment hardening
Added `robots.txt`, `sitemap.xml`, and expanded automated QA for page metadata, accessibility hooks, structured JSON, local-URL leakage, and deployment-file presence. The sitemap uses the expected GitHub Pages base and must be rechecked if a custom domain is later attached.
