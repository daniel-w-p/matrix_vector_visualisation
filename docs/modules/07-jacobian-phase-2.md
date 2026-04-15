# Module Spec — Jacobian / Polar Coordinates (Phase 2)

## Status
Future module, not part of the initial build sequence.

## Goal
Explain the Jacobian determinant as a local area/volume scaling factor.

## Main intuition
A tiny region in one coordinate system gets transformed into a tiny parallelogram or parallelepiped in another.  
The Jacobian determinant measures that local scaling.

## Ideal teaching example
Cartesian ↔ polar coordinates in 2D.

## Core visuals

- small differential cell in parameter space
- transformed local patch
- local basis vectors
- determinant value as area scale
- explanation of why the polar area element includes the factor `r`

## Why this is phase 2
The app first needs a stable foundation for:
- matrix transformations
- determinant intuition
- guided pedagogy
- compare/preset infrastructure
