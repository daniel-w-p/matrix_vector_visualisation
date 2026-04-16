# Codex Prompt Sequence

These prompts are meant to be used **one step at a time**.

## Recommended usage pattern

For each numbered step:

1. open the matching file in `prompts/`
2. paste it into Codex
3. use the suggested mode (`Ask`, `Plan`, or `Code`)
4. review the result before moving on
5. do not merge multiple large steps into one prompt unless the repo has already stabilized

## Why the prompts are split

This project spans:

- frontend architecture
- backend hosting
- math correctness
- visualization
- pedagogy
- performance

If you ask Codex to do all of that in one pass, the result is harder to verify and harder to improve.

## Prompt order

- `00-plan-and-audit.md`
- `01-scaffold-frontend.md`
- `02-scaffold-django-host.md`
- `03-quality-gates.md`
- `04-math-core.md`
- `05-svg-scene-engine.md`
- `06-vector-2d-module.md`
- `07-dot-product-module.md`
- `08-matrix-2d-and-determinant.md`
- `09-3d-foundation.md`
- `10-cross-product-module.md`
- `11-matrix-3d-module.md`
- `12-eigen-module.md`
- `13-workers-and-performance.md`
- `15-django-integration-and-release.md`

## Practical advice

- Use **Ask/Plan** for step 00 and for any task that feels architecture-heavy.
- Use **Code** for implementation steps.
- If Codex repeats a mistake, update `AGENTS.md` or the relevant doc instead of retyping the same instruction forever.
- If a step grows too large, split it again.

## First prompt

Use `FIRST_PROMPT.md`.
