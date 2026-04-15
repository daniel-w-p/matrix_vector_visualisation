# Intended Repository Structure

This repo starts docs-first, but the intended implementation layout is:

```text
/
├─ README.md
├─ AGENTS.md
├─ PRODUCT_SPEC.md
├─ ARCHITECTURE.md
├─ ROADMAP.md
├─ TASKS.md
├─ PROMPTS.md
├─ FIRST_PROMPT.md
├─ PLANS_TEMPLATE.md
├─ docs/
├─ prompts/
├─ frontend/
│  └─ src/
│     ├─ app/
│     ├─ components/
│     ├─ content/
│     ├─ hooks/
│     ├─ math/
│     ├─ modules/
│     ├─ scene2d/
│     ├─ scene3d/
│     ├─ styles/
│     ├─ tests/
│     └─ workers/
└─ backend/
   ├─ config/
   └─ vectorlab_web/
```

## Ownership rules

### `frontend/src/math/`
Pure math and geometry helpers only.

### `frontend/src/scene2d/`
Shared SVG-level primitives and scene helpers.

### `frontend/src/scene3d/`
Shared 3D primitives and wrappers.

### `frontend/src/modules/`
Feature-specific composition of UI + math + scene pieces.

### `frontend/src/content/`
Explanatory text, presets, and educational metadata.

### `backend/`
Thin Django host and future API surface.

## Why this split matters

The same math logic should be reusable across:
- 2D modules
- 3D modules
- tests
- workers
- future content modes

If math gets buried inside components, future changes become much harder.
