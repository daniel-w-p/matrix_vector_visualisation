# Module Spec — Matrix 2D and Determinant

## Goal
Teach a 2x2 matrix as a transformation of the plane, not just a table of numbers.

## Main intuition
A matrix transforms basis vectors, and therefore transforms every vector and every shape built from them.

## Core visuals

- editable 2x2 matrix
- basis vectors `e1`, `e2` and their images
- optional input vector and transformed output vector
- coordinate grid and transformed grid
- unit square turning into a parallelogram
- determinant readout tied to area and orientation

## Required interactions

- edit entries of one or two matrices
- choose matrix operation: add / subtract / scale
- apply matrix to vector
- toggle transformed basis, transformed grid, and determinant overlay
- presets for identity, reflection, shear, singular matrix, rotation-scaling, etc.

## What the learner should notice

- matrix columns are transformed basis vectors
- adding matrices adds their basis images component-wise
- scaling a matrix scales the whole transformation
- determinant measures area scale
- determinant sign carries orientation information
- determinant zero collapses area

## Acceptance criteria

- transformed grid is visually stable and readable
- unit square → parallelogram view is central, not hidden
- matrix–vector multiplication is shown both algebraically and geometrically

## Tests to expect

- matrix arithmetic correctness
- matrix–vector multiply correctness
- 2x2 determinant correctness
- singular and negative-determinant presets
