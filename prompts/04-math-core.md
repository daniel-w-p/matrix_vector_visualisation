# Prompt 04 — Math Core

**Recommended mode:** Code

```text
Read AGENTS.md, PRODUCT_SPEC.md, ARCHITECTURE.md, and docs/modules/01-vector-2d.md through docs/modules/06-eigen.md.

Implement the first version of the pure math core in `frontend/src/math/`.

Scope:
- vector types and helpers for 2D and 3D
- matrix types and helpers for 2x2 and 3x3
- add / subtract / scale
- dot product
- cross product
- matrix–vector multiplication
- determinant for 2x2 and 3x3
- helper for verifying `A v = λ v` via difference vector / residual

Constraints:
- pure functions only
- no rendering code
- no React dependencies
- keep naming explicit and approachable
- add unit tests for all non-trivial math

Do not build UI for these operations yet.

Verification:
- run frontend tests
- run build if relevant
- report results
```
