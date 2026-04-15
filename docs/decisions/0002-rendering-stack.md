# ADR 0002 — SVG for 2D, R3F/Three.js for 3D

## Status
Accepted

## Decision
Use SVG for 2D modules and React Three Fiber / Three.js for 3D modules.

## Rationale
2D scenes are:
- geometric
- label-heavy
- control-heavy
- relatively low in object count

3D scenes benefit from:
- camera control
- depth cues
- reusable 3D primitives
- GPU-assisted rendering in the browser

## Consequences
- do not force 3D infrastructure into simple 2D modules
- keep separate scene layers for 2D and 3D
- share only math/domain logic between them
