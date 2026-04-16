# Screen Map

## App shell

Recommended top-level structure:

- Home / concept chooser
- Explore
- Explain
- Compare (later)
- About / help

A simpler initial version may use a single shell with module tabs.

## Shared module layout

Recommended desktop layout:

- **Center:** primary visualization
- **Left-lower area:** controls, presets, and algebraic representation
- **Right column (always present):**
  - `What to notice`
  - `Theory` (short conceptual explanation + simple example)
  - `Status`

Global UI controls:

- language switch: `EN` / `PL`
- theme switch: light / dark

## Core module navigation

Suggested initial module list:

- Vector 2D
- Dot Product
- Matrix 2D
- Cross Product 3D
- Matrix 3D
- Eigen

## Responsive behavior

For smaller screens:

- stack visualization above controls
- keep right-column cards present, but move them below the scene if needed
- reduce simultaneous panels
- prefer progressive reveal over density

## Design note

A coherent shared layout matters more than adding many controls early.
