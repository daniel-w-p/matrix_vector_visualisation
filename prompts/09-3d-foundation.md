# Prompt 09 — 3D Foundation

**Recommended mode:** Code

```text
Read AGENTS.md, ARCHITECTURE.md, docs/modules/04-cross-product-3d.md, and docs/modules/05-matrix-3d.md.

Implement the shared 3D scene foundation in `frontend/src/scene3d/`.

Scope:
- shared R3F canvas wrapper
- axes helper
- reusable vector representation
- camera / controls setup
- basic overlay strategy for labels or readouts
- clean composition boundary for future 3D modules

Constraints:
- do not implement the full Cross Product or Matrix 3D module yet
- keep shared pieces generic
- document any important 3D trade-offs in the docs if they emerge

Verification:
- run build/tests if relevant
- describe manual 3D checks
```
