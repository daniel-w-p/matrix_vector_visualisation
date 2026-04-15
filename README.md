# Vector Lab — Codex Starter Repository

This repository is a **docs-first starter kit** for building a web-based educational app for learning vectors, matrices, determinants, and eigen concepts through interaction.

It intentionally starts **without implementation code**. The goal is to give Codex a clean, durable project context before any scaffolding begins.

## Product intent

Build a web app that helps learners **see** and **manipulate** linear algebra ideas:

- vector addition, subtraction, and scaling
- dot product as projection and cosine-of-angle
- cross product as oriented area and normal direction
- matrix addition, subtraction, scaling, and matrix–vector multiplication
- determinant as area/volume scaling and orientation change
- eigenvalues and eigenvectors with live verification of `A v = λ v`

This is **not** meant to become a calculator-first tool. It should feel like a guided visual lab.

## Chosen stack

- **Frontend:** React + TypeScript + Vite
- **2D rendering:** SVG
- **3D rendering:** React Three Fiber / Three.js
- **Heavy computations:** Web Workers when needed
- **Backend:** Django as a thin host layer and future API surface

## Why this starter repo exists

Codex works best when the repository already contains:

- a stable project description
- architecture decisions
- module-level acceptance criteria
- task boundaries
- reusable instructions in `AGENTS.md`
- prompts that are small enough to produce reviewable changes

This repo gives you that structure up front.

## Suggested first session with Codex

1. Open the repo root.
2. Run the prompt in `FIRST_PROMPT.md` in **Ask** or **Plan** mode.
3. Review Codex's plan.
4. Then execute `prompts/01-scaffold-frontend.md`.
5. Continue one prompt at a time.

Do **not** paste the whole prompt sequence into one session.

## Repository map

- `AGENTS.md` — standing instructions for Codex
- `PRODUCT_SPEC.md` — product scope and teaching goals
- `ARCHITECTURE.md` — proposed technical structure
- `ROADMAP.md` — milestone order
- `TASKS.md` — prioritized backlog
- `PROMPTS.md` — index of the prompt sequence
- `FIRST_PROMPT.md` — first prompt to run
- `PLANS_TEMPLATE.md` — reusable planning template for larger tasks
- `docs/modules/` — module-by-module feature specs
- `docs/ux/` — screen and pedagogy notes
- `docs/deployment/` — Django hosting plan
- `prompts/` — copy-paste prompt files for Codex
- `docs/frontend-plan.md` — intended frontend structure
- `docs/backend-plan.md` — intended backend structure

## Recommended build order

1. Frontend scaffold
2. Django host scaffold
3. Quality gates
4. Pure math core
5. SVG scene foundation
6. Vector 2D module
7. Dot product module
8. Matrix 2D + determinant module
9. 3D foundation
10. Cross product module
11. Matrix 3D module
12. Eigen module
13. Workers and performance
14. Pedagogy layer
15. Django integration and release polish

## Working principle

For this project, prioritize:

1. conceptual clarity
2. stable architecture
3. incremental delivery
4. visual quality
5. performance optimization
6. backend expansion only when truly needed

## Notes

- Most repo docs and prompts are written in **English** on purpose, because that usually gives coding agents the most predictable results.
- You can still talk to Codex in Polish if you prefer.
