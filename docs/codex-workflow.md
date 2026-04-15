# Codex Workflow

## Recommended loop

### 1. Read
Point Codex at the relevant docs first.

### 2. Plan
For non-trivial tasks, ask for a short plan before code changes.

### 3. Implement
Use one implementation prompt at a time.

### 4. Verify
Require build/test/check results where possible.

### 5. Update docs
If architecture or module behavior changed, update the matching docs immediately.

## What not to do

- do not ask for the whole application in one prompt
- do not mix large refactors with new feature delivery in the same step
- do not skip math tests for non-trivial logic
- do not silently expand backend scope
- do not hide architectural changes from the docs

## When to split a task further

Split again if a task touches multiple layers at once, for example:

- math core + rendering + pedagogy
- frontend + backend + deployment
- shared primitives + two or more modules

## Good Codex response shape

A strong response from Codex should usually include:

- a short plan
- changed files
- commands run
- verification results
- any remaining manual checks
- the recommended next step
