# Task Backlog

Use this file as the high-level implementation queue.

## Status key

- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `[!]` blocked / needs decision

---

## Foundation

- [x] Create docs-first starter repository
- [ ] Run `FIRST_PROMPT.md` in Codex Ask/Plan mode
- [x] Scaffold `frontend/` with React + TypeScript + Vite
- [x] Scaffold `backend/` with Django host shell
- [x] Add build/lint/test quality gates
- [x] Add base README instructions for local development

## Frontend core

- [x] Create app shell and module navigation
- [ ] Create shared UI primitives for controls and panels
- [ ] Create content/preset loading strategy
- [x] Define domain types for vectors and matrices
- [x] Implement pure math core for v1 operations
- [x] Add tests for pure math core

## 2D scene foundation

- [x] Axes primitive
- [x] Grid primitive
- [x] Vector arrow primitive
- [x] Label primitive
- [x] Angle arc primitive
- [x] Polygon / area highlight primitive
- [x] Drag interaction helpers
- [x] Scene-to-data coordinate mapping tests

## Module 1 - Vector 2D

- [x] Vector 2D screen
- [x] Add/subtract/scale controls
- [x] Tail-to-head and parallelogram views
- [x] Live algebra panel
- [x] Pedagogical presets
- [x] Module tests

## Module 2 - Dot product

- [x] Dot product screen
- [x] Projection visualization
- [x] Angle + cosine view
- [x] Positive / zero / negative state callouts
- [x] Unit-vector teaching mode
- [x] Module tests

## Module 3 - Matrix 2D and determinant

- [x] Matrix 2D edit controls
- [x] Matrix add/subtract/scale interaction
- [x] Matrix-vector multiplication view
- [x] Transformed basis view
- [x] Transformed grid view
- [x] Unit square to parallelogram determinant view
- [x] Orientation flip indicator
- [x] Module tests

## 3D foundation

- [x] Shared R3F canvas wrapper
- [x] Axes helper
- [x] Vector mesh helper
- [x] Camera / controls setup
- [x] Overlay strategy for labels and explanations

## Module 4 - Cross product

- [x] Cross product screen
- [x] Parallelogram visualization
- [x] Sine-of-angle visualization
- [x] Normal vector visualization
- [x] Operand-order swap mode
- [x] Module tests

## Module 5 - Matrix 3D

- [x] Matrix 3D edit controls
- [x] Matrix add/subtract/scale interaction
- [x] Matrix-vector multiplication view
- [x] Basis transformation view
- [x] Unit cube to parallelepiped view
- [x] Determinant as volume scale
- [x] Module tests

## Module 6 - Eigen

- [x] Eigen screen
- [x] Candidate vector selection
- [x] `A v` overlay
- [x] `? v` overlay
- [x] Difference vector overlay
- [x] Presets for special cases
- [x] 2D no-real-eigenvector rotation case
- [x] Module tests

## Performance and workers

- [ ] Identify candidate heavy computations
- [ ] Add worker boundary only where justified
- [ ] Add worker tests / fallback strategy
- [ ] Verify UI responsiveness with larger scenes

## Deployment and release

- [ ] Frontend production build wired into Django
- [ ] Django static handling configured
- [ ] Local dev instructions finalized
- [ ] Release checklist
- [ ] Smoke test deployed shell

## Phase 2 / backlog

- [ ] Jacobian / polar coordinates module
- [ ] Saved presets
- [ ] Account system
- [ ] Analytics
- [ ] Teacher mode
