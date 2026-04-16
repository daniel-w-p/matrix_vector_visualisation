# Roadmap

## Milestone 0 — Planning and repository scaffold

### Goals
- establish repo context for Codex
- lock initial architecture decisions
- scaffold frontend and backend shells
- set up quality gates

### Exit criteria
- docs are in place
- frontend shell exists
- backend shell exists
- build/test/lint scripts exist or are clearly staged

---

## Milestone 1 — 2D interaction foundation

### Goals
- build the reusable SVG scene layer
- implement vector addition, subtraction, and scaling in 2D
- create the first polished exploratory module

### Deliverables
- axes, grid, arrow, labels, draggable endpoints
- vector 2D module
- synced algebra + visualization

### Exit criteria
- a user can manipulate vectors directly
- scene updates are smooth
- vector math is tested

---

## Milestone 2 — Dot product and 2D matrix transformation

### Goals
- teach projection and cosine
- show matrix action on vectors and the plane
- introduce determinant as area scaling

### Deliverables
- dot product module
- matrix 2D module
- determinant visualization with transformed unit square

### Exit criteria
- acute/right/obtuse dot-product cases are obvious
- transformed grid and determinant interpretation are visually clear

---

## Milestone 3 — 3D foundation and cross product

### Goals
- establish reusable 3D scene helpers
- add cross product teaching flow
- support 3D vector interaction and camera control

### Deliverables
- R3F scene foundation
- cross product module
- 3D vector primitives

### Exit criteria
- cross product magnitude and direction are visible
- swapping operands clearly flips the result

---

## Milestone 4 — 3D matrix behavior and eigen concepts

### Goals
- show 3x3 matrix behavior
- visualize determinant as volume scaling
- build eigen module with correctness check

### Deliverables
- matrix 3D module
- eigen module
- `A v = λ v` overlay / verification view

### Exit criteria
- invariant directions are explainable
- difference vector / correctness view works
- edge cases are represented in presets

---

## Milestone 5 — Performance and release polish

### Goals
- move only justified workloads to workers
- finish Django integration for deployment
- refine accessibility and usability

### Deliverables
- worker boundary where useful
- Django static integration
- release checklist

### Exit criteria
- app feels like one coherent learning product
- server remains thin
- main educational paths are usable end to end

---

## Milestone 6 — Phase 2 ideas

### Candidate topics
- Jacobian / polar coordinates module
- richer challenge mode
- teacher annotations
- stored presets
- optional API-backed progress tracking
