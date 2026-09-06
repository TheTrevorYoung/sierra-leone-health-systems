# Sierra Leone Health Research

Public website for **Sierra Leone Health Research**, an independent health-systems research entity focused initially on Sierra Leone.

**Canonical domain:** https://sierraleonehealthresearch.org/  
**GitHub Pages fallback:** https://thetrevoryoung.github.io/sierra-leone-health-systems/  
**Repository:** `TheTrevorYoung/sierra-leone-health-systems`  
**Production branch:** `main`  
**Publishing:** GitHub Pages from `main` / repository root

> The repository slug is legacy infrastructure. The public entity name is **Sierra Leone Health Research**.

## Institutional boundary

Sierra Leone Health Research conducts research, analysis, evidence synthesis, public explanation and expert review. It does **not** provide medical care, operate healthcare facilities, manage referrals, enroll patients, provide insurance, or represent the Government of Sierra Leone.

Any future healthcare-delivery venture must be institutionally separate from Sierra Leone Health Research.

## Research focus

- Sierra Leone health-system baseline
- referral completion and referral closure
- maternal health as an end-to-end systems tracer
- primary-care reliability
- workforce
- medicines and diagnostics
- emergency transport
- health financing and financial protection
- data and information continuity
- policy-to-implementation analysis
- comparative health systems

Closed-loop referral is a **research lens**, not a service operated by this entity.

## Key sections

- `/research/` — current research
- `/sierra-leone/` — Sierra Leone baseline and reform tracker
- `/research/healthcare-that-works/` — comparative systems research
- `/model/` — Research Framework (legacy URL retained)
- `/model/financing/` — Health Financing Research
- `/model/change-log/` — Research Updates
- `/participate/` — Contribute to the Research
- `/participate/experts/` — Expert Review Network
- `/evidence/` — Evidence Library
- `/pilot-pathway/` — Research Agenda (legacy URL retained)
- `/about/` — mission and institutional boundary
- `/about/methodology/` — methodology
- `/about/corrections/` — corrections policy

## Research governance

Material research should distinguish among:
- documented fact;
- policy / official plan;
- implementation evidence;
- evidence-supported interpretation;
- expert view;
- lived experience;
- project hypothesis;
- under review;
- corrected;
- superseded.

Policy existence is not proof of implementation. AI may support research operations but is not evidence.

Systematic human-participant research or sensitive health-data collection requires an appropriate ethics determination before collection and any applicable approvals.

## Architecture

- Static HTML/CSS/JS
- GitHub Pages
- No server-side runtime or database
- No patient portal or patient intake
- No health-record upload
- No clinical triage or medical-advice tools
- Mobile-first and low-bandwidth oriented
- `.nojekyll`, custom 404, `robots.txt` and `sitemap.xml`

## Routine update process

1. Make a bounded, reviewable change.
2. Run `python scripts/qa.py` when local execution is available.
3. Commit routine low-risk updates directly to `main`.
4. Use a branch / pull request for major redesigns, sensitive claims, risky integrations or multi-contributor work.
5. Verify GitHub Pages and the canonical domain after material changes.
6. Revert to a known-good commit if production breaks.

Routine publishing should use GitHub directly. Make is not the routine website-publishing layer.

## Current strategic lock — 6 September 2026

The former research-to-implementation direction was superseded. The website now treats Sierra Leone Health Research as a **pure research entity**.

Legacy URLs are preserved for link stability but repurposed:
- “The Model” → Research Framework
- “Build the Model With Us” → Contribute to the Research
- “Pilot Pathway” → Research Agenda

Build v0.5 reflects this research-only identity.
