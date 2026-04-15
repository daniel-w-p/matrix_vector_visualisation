# Frontend Plan

This document describes the intended client application.

## Planned stack

- React
- TypeScript
- Vite
- SVG for 2D scenes
- React Three Fiber / Three.js for 3D scenes
- Web Workers for justified heavy computations

## Planned source layout

```text
frontend/
└─ src/
   ├─ app/
   ├─ components/
   ├─ content/
   ├─ hooks/
   ├─ math/
   ├─ modules/
   ├─ scene2d/
   ├─ scene3d/
   ├─ styles/
   ├─ tests/
   └─ workers/
```

## Initial implementation goals

- app shell
- module navigation
- stable math core
- reusable 2D primitives
- reusable 3D primitives
