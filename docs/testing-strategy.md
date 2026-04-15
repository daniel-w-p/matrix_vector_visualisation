# Testing Strategy

## Priority order

1. **Pure math tests**
2. **Module interaction tests**
3. **Scene helper tests**
4. **Backend smoke tests**
5. **End-to-end tests later if needed**

## Math tests should cover

- vector add/subtract/scale
- dot product
- cross product
- matrix add/subtract/scale
- matrix–vector multiplication
- determinant for 2x2 and 3x3
- eigen verification helper (`A v - λ v`)
- edge cases such as zero vectors or singular matrices where relevant

## UI / interaction tests should cover

- dragging a handle updates numbers
- toggles affect visibility correctly
- presets load expected state
- explanation panel updates with scene state
- compare mode keeps both panes independent

## Backend tests should cover

- index page loads
- static asset integration is configured
- future APIs return expected shape when introduced
