# ADR 0003 — 3D Overlay Strategy

## Status
Accepted

## Decision
For early 3D modules:
- keep geometric objects in WebGL (R3F/Three.js)
- render readouts in HTML overlay panels above the canvas
- use small anchored HTML labels only for short in-scene markers (for example `a`, `b`, `x`, `y`, `z`)

## Rationale
- HTML readouts are easier to keep readable across zoom/orbit states.
- Localization and typography are easier in normal DOM than in 3D text meshes.
- Keeping most pedagogy copy out of WebGL reduces visual clutter in first 3D modules.

## Consequences
- shared 3D canvas needs a built-in overlay slot
- future modules should treat overlays as module-level composition, not hardcoded scene content
- if we later need occluded/in-world text, it should be introduced selectively
