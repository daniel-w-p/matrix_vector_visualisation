# Module Spec — Eigen

## Goal
Teach eigenvectors as preserved directions and eigenvalues as scale factors on those directions.

## Main intuition
Most vectors change direction under a transformation. An eigenvector does not — it only scales (or flips).

## Core visuals

- matrix selector / editor
- candidate vector `v`
- transformed vector `A v`
- scaled vector `λ v`
- difference vector `A v - λ v`
- optional sampled rays or highlighted invariant directions

## Required interactions

- choose or edit matrix
- choose candidate vector
- display or hide `A v`, `λ v`, and difference vector
- presets for:
  - distinct real eigenvalues
  - repeated eigenvalue
  - zero eigenvalue
  - negative eigenvalue
  - 2D rotation with no real eigenvectors
  - non-diagonalizable example if feasible

## What the learner should notice

- eigenvectors keep their direction
- eigenvalues tell how much that direction scales
- a negative eigenvalue flips direction
- zero eigenvalue collapses that direction
- some transformations have no real eigenvectors in 2D

## Acceptance criteria

- `A v` vs `λ v` comparison is obvious
- correctness check is not just numeric text; it is visual
- the module handles “no real eigenvectors” honestly and clearly

## Notes on scope
For pedagogy, the 2D view can be the strongest first implementation.  
3D eigen support can start with focused scenes and good presets rather than trying to make every 3D case visually perfect in the first pass.

## Tests to expect

- eigen verification helper correctness
- preset behavior
- edge case messaging
