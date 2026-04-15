# Module Spec — Cross Product 3D

## Goal
Teach the cross product as oriented area plus a perpendicular direction.

## Main intuition
The magnitude of `a × b` is the area of the parallelogram spanned by `a` and `b`, and its direction is perpendicular to both.

## Core visuals

- 3D vectors `a` and `b`
- angle marker
- parallelogram spanned by `a` and `b`
- normal vector for `a × b`
- optional comparison with `b × a`
- optional right-hand-rule hint

## Required interactions

- drag or edit vector values
- orbit / inspect the scene
- toggle sine display
- toggle parallelogram fill
- swap operand order
- presets for parallel, perpendicular, and general cases

## What the learner should notice

- cross product vanishes for parallel vectors
- it is largest for fixed magnitudes when vectors are perpendicular
- swapping operands flips direction
- magnitude relates to `|a||b|sin(θ)`

## Acceptance criteria

- area intuition is obvious from the scene
- the normal direction is readable from multiple camera angles
- swapping operands gives a clearly opposite result

## Tests to expect

- cross product correctness
- magnitude correctness
- operand-order sign flip
- preset loading
