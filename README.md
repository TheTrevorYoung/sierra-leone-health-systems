# Sierra Leone Health Systems — Research & Co-Design Website

Public Tier 1 website for **Sierra Leone Health Systems**.

**Production / temporary public URL:** https://thetrevoryoung.github.io/sierra-leone-health-systems/  
**Repository:** `TheTrevorYoung/sierra-leone-health-systems`  
**Deployment tier:** Tier 1 — Direct Publish  
**Production branch:** `main`  
**Publishing source:** GitHub Pages from `main` / repository root

## Public boundary
This is a health-systems research and public-learning website. It is **not** a healthcare provider, hospital, insurer, patient portal, clinical-research enrollment site, or government program.

## Portfolio website standard
Shared website infrastructure is governed by the locked **Social Media Portfolio — Website Infrastructure, Deployment & Security Standard v1.0** and the shared **Portfolio Website Registry & Infrastructure Status**.

For this Tier 1 site:
- GitHub is the authoritative source of website code/content.
- Routine updates are made directly to the repository; **Make is not the routine publishing layer**.
- GitHub Pages publishes directly from `main` / root.
- No custom GitHub Action is required merely to publish the site.
- Routine editing target: **zero Make credits**.
- The dedicated Health Systems project remains authoritative for content, claims, research methodology, design direction and public identity.

## Architecture
- Static HTML/CSS/JS
- No server-side runtime, database, authentication or payments
- No patient intake or sensitive health-data collection
- No analytics/tracking currently installed
- No external runtime JS/CSS dependency
- `.nojekyll`, custom 404, `robots.txt` and `sitemap.xml`
- Mobile-first and low-bandwidth oriented

## Key sections
- `/research/` — comparative health-system research
- `/sierra-leone/` — Sierra Leone baseline and reform tracker
- `/model/` — Model 0.x
- `/participate/` — structured participation architecture
- `/evidence/` — auditable source library
- `/pilot-pathway/` — future clinical readiness gates
- `/about/` — mission, methodology, corrections and boundaries

## Routine update process
1. Make a bounded, reviewable change.
2. Run `python scripts/qa.py` locally before publishing.
3. Commit directly to `main` for ordinary low-risk solo edits.
4. Use a feature branch / pull request for material redesigns, sensitive claims, risky integrations or multi-contributor work.
5. Confirm GitHub Pages remains healthy after the commit.
6. Roll back by reverting to a known-good Git commit if production breaks.

Do **not** use ZIP replacement or Make-based per-file publishing for routine updates.

## Local preview
```bash
python -m http.server 8000
```
Open `http://localhost:8000/`.

## Content governance
All material claims should remain classified as one of:
- PUBLIC NOW
- PUBLIC WITH QUALIFIER
- INTERNAL ONLY
- PROHIBITED UNTIL GATE

Do not publish provider, licensing, government-partnership, pilot-authorization, insurance, referral-network, clinical-outcome or patient-enrollment claims before documentary gates close.

## Current build
Build v0.2 includes the Sierra Leone reform tracker, cross-model comparison, Model 0.x, financing context, evidence registry and public claim firewall.

Registry-alignment hardening completed September 5, 2026:
- registry-selected GitHub App access can read repository state, but direct repository writes are still blocked pending selected-repository authorization;
- this alignment is being applied through a one-time Make administrative exception; the legacy ZIP deployment workflow is retired as part of that migration;
- deployment documentation converted to Tier 1 direct publishing;
- 404 routing hardened for GitHub project-page paths;
- QA expanded to verify sitemap coverage, 404 no-index behavior and absence of forms/external runtime dependencies.

The public discovery base in `robots.txt` and `sitemap.xml` currently uses the GitHub Pages URL. When an owned production domain is connected, those files and any canonical/Open Graph URL metadata must be reconciled to the canonical host.
