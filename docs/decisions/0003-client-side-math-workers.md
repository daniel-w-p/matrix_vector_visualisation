# ADR 0003 — Client-side math by default, workers only where justified

## Status
Accepted

## Decision
Keep calculations on the client by default. Introduce Web Workers only for workloads that threaten responsiveness.

## Rationale
Most v1 operations are mathematically light:
- vector arithmetic
- matrix arithmetic
- determinant
- matrix–vector multiplication

These do not need server execution.

Some future or repeated tasks may justify workers:
- dense sampling
- repeated numerical scanning
- performance-sensitive 3D helper generation

## Consequences
- the server remains cheap and simple
- math code must be portable and framework-agnostic
- worker boundaries should be added based on real need, not habit
