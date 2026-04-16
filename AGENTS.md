# AGENTS.md

## Mission

Build a web-first educational app for exploring linear algebra concepts through direct manipulation, visual explanation, and small guided experiments.

Optimize for **learning value**, not for raw feature count.

## Non-negotiable product constraints

- This is **not** a calculator-first app.
- Keep the app **client-heavy** by default.
- Use **React + TypeScript + Vite** for the frontend.
- Use **SVG** as the primary rendering layer for 2D scenes.
- Use **React Three Fiber / Three.js** for 3D scenes.
- Use **Web Workers** only for computations that are expensive enough to threaten UI responsiveness.
- Keep **Django** as a thin hosting layer unless a task explicitly requests new backend behavior.
- Keep math logic, rendering logic, and teaching content separated.

## Required reading before non-trivial changes

Read these files before medium or large tasks:

- `README.md`
- `PRODUCT_SPEC.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `TASKS.md`
- relevant file(s) in `docs/modules/`
- relevant file(s) in `docs/ux/`
- relevant prompt file in `prompts/`

## Working style

- For medium or large tasks, inspect the docs and produce a short implementation plan before editing code.
- Keep changes small and reviewable.
- Prefer one milestone or sub-problem per task.
- Avoid speculative abstractions.
- Do not add production dependencies unless they clearly reduce complexity or unlock a required capability.
- When a dependency is added, explain why the existing stack was not enough.
- When architecture or behavior changes, update the matching docs in the same task.

## Frontend rules

- Keep pure math in `frontend/src/math/`.
- Keep SVG scene primitives in `frontend/src/scene2d/`.
- Keep 3D scene helpers in `frontend/src/scene3d/`.
- Keep module-specific UI under `frontend/src/modules/`.
- Keep lesson text, presets, and pedagogical content in `frontend/src/content/`.
- Avoid putting domain logic inside React components if it can be a pure function.
- Prefer explicit types over implicit shape assumptions.
- Use local state and context first; only introduce a larger state library if the repo genuinely needs it.

## Persistent UX requirements (project owner)

- The app must support two UI languages: Polish (`pl`) and English (`en`).
- The app must support both light mode and dark mode.
- The right column must always contain, in this order:
  - `What to notice`
  - `Theory` (including short explanatory examples for the active concept)
  - `Status`
- This right-column structure should be respected across all module tabs, not only the current module.

## Backend rules

- Django should initially serve:
  - the HTML shell
  - built frontend assets
  - optional future API endpoints
- Do not move math computation to the server unless explicitly requested.
- Keep backend ownership narrow and clear.

## Pedagogy rules

- Show multiple synchronized representations when useful:
  - geometric
  - algebraic
  - textual explanation
- Prefer gradual reveal over dense screens.
- Use interaction to teach:
  - dragging
  - toggles
  - presets
  - comparison mode
  - prediction-before-reveal
- Avoid color as the only carrier of meaning.
- Use labels, legends, and visible state changes.

## Verification rules

When the project reaches implementation stages:

- run frontend build, lint, and test commands after relevant changes
- run Django checks after backend changes
- state exactly what you verified
- if a command is missing, add the missing script or document the gap

## Definition of done

A task is done only if:

- the requested scope is implemented and no bigger
- file ownership is clear
- docs are aligned with the code
- tests exist for non-trivial math logic
- there are no silent TODO placeholders for critical behavior
- the next step is obvious from the repo state

## Review checklist

Before finishing, review:

- Is this still an educational app rather than a calculator?
- Is the heavy work still on the client unless there is a strong reason otherwise?
- Is math logic separate from rendering?
- Is the chosen rendering layer correct for the task: SVG for 2D, R3F for 3D?
- Did we keep the UI learnable and not overly dense?
- Did we avoid dependency bloat?
- Did we update the relevant docs?
