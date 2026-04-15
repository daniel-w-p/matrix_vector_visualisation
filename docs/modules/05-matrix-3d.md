# Module Spec — Matrix 3D

## Goal
Teach 3x3 matrices as transformations of 3D space.

## Main intuition
A 3x3 matrix transforms the basis, which transforms vectors, planes, and volumes.

## Core visuals

- editable 3x3 matrix
- transformed basis vectors
- optional input vector and output vector
- unit cube transforming into a parallelepiped
- determinant readout tied to volume scaling

## Required interactions

- edit matrix entries
- add / subtract / scale matrices
- apply matrix to a vector
- toggle transformed basis and transformed unit cube
- presets for identity, reflection, singular matrix, axis scaling, shear-like cases

## What the learner should notice

- basis transformation explains the whole matrix
- determinant gives volume scale in 3D
- determinant sign still matters for orientation
- determinant zero collapses volume

## Acceptance criteria

- transformed unit cube is understandable and not visually chaotic
- matrix–vector multiplication is visible in 3D
- determinant meaning is tied to the shape transformation

## Tests to expect

- matrix arithmetic correctness
- matrix–vector multiply correctness
- 3x3 determinant correctness
- key presets
