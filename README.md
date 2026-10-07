# Syed Subhan Hussain — Portfolio v2.0

Cinematic, scroll-driven portfolio for **Syed Subhan Hussain** — Cyber Security Analyst, IoT & Blockchain specialist, builder of DEFENXIA.

**Live:** https://resume-steel-kappa.vercel.app/

## Concept

The site is structured as a **journey told in chapters**, each revealed cinematically while scrolling:

| # | Chapter | Content |
|---|---------|---------|
| 00 | Boot gate + Hero | Terminal-style auth sequence → giant kinetic typography, typing roles, stats |
| 01 | Origin | Identity card, bio, education timeline |
| 02 | Arsenal | Skill groups with animated bars + toolkit chips |
| 03 | Missions | Experience timeline — 4 internships, lab work, HACKTOBER |
| 04 | Flagship | DEFENXIA feature — live demos, GitHub, demo video |
| 05 | Credentials | 10 certifications |
| 06 | Proof | Achievements |
| 07 | Trajectory | Future vision — product, global career, ventures |
| 08 | Contact | Direct channels + transmission form |

## Design language

Inspired by 2025–2026's most talked-about portfolios (Awwwards SOTDs, viral dev portfolios): dark-first canvas with a single neon accent, grotesk display + monospace pairing, intro gate, kinetic typography, scroll-choreographed reveals, custom cursor, magnetic buttons, particle-network ambience, marquee tickers, chapter numbering.

## Stack

- React 18 + TypeScript + Vite 6
- Tailwind CSS v4
- GSAP + ScrollTrigger (reveals, counters, bars)
- Lenis (buttery smooth scroll)
- Lucide icons

## Develop

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # -> dist/
```

## Content

All copy lives in `src/data.ts` — a single source of truth mirroring the resume. The downloadable resume is `public/resume.pdf`.
