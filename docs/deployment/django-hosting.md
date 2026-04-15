# Django Hosting Plan

## Goal

Use Django as a **thin host** for the built frontend, not as the place where the math or rendering happens.

## Development mode

Recommended setup:

- run the Vite dev server for frontend work
- run Django separately only when backend integration is needed

This keeps the frontend iteration loop fast.

## Production mode

Recommended flow:

1. build the frontend into static assets
2. make the build output available to Django
3. serve the shell page and collected assets through Django
4. keep same-origin hosting simple

## Backend responsibilities

- shell page route
- static asset delivery
- optional future API namespace
- deployment integration

## Avoid in early versions

- SSR complexity
- server-rendered math scenes
- backend state for core exploration
- API-first architecture before it is needed

## Integration checkpoint

A milestone is ready when:

- frontend production build succeeds
- Django can serve the built shell page
- static asset references are stable
- deployment instructions are documented
