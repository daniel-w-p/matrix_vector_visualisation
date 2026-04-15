# Prompt 14 — Pedagogy Layer

**Recommended mode:** Code

```text
Read AGENTS.md, PRODUCT_SPEC.md, docs/ux/pedagogy-principles.md, and the existing module docs.

Implement the first shared pedagogy layer.

Scope:
- preset system
- explanation text mapping
- reusable “what to notice” panel
- basic compare mode if the current codebase can support it cleanly
- optional prediction-before-reveal behavior if it fits naturally

Constraints:
- keep this layer lightweight
- avoid coupling content too tightly to rendering internals
- do not derail stable modules with a massive refactor unless clearly necessary

Verification:
- run tests/build
- report results and any manual UX checks
```
