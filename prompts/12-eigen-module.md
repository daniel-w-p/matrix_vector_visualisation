# Prompt 12 — Eigen Module

**Recommended mode:** Code

```text
Read AGENTS.md, PRODUCT_SPEC.md, docs/modules/06-eigen.md, and docs/ux/pedagogy-principles.md.

Implement the Eigen teaching module.

Requirements:
- support selecting or editing a matrix
- show candidate vector `v`
- show `A v`
- show `λ v`
- show the residual / difference vector
- include presets for key special cases
- explain when real eigenvectors do not exist in the 2D rotation case
- keep the strongest pedagogical experience in 2D first, while leaving room for 3D support

Constraints:
- do not fake certainty where the visualization is approximate
- correctness should be visible, not only numeric
- keep heavy computations out of the main UI if they become expensive

Verification:
- run tests/build
- report results and manual checks
```
