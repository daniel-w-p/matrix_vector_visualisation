# Django Hosting Plan

## Goal

Use Django as a thin host for the built frontend, not as the place where math or rendering happens.

## Development mode

Recommended setup:

- run the Vite dev server for frontend work
- run Django separately only when backend integration is needed

Commands:

- `cd frontend && npm run dev`
- `cd backend && py -3 manage.py runserver`

## Production mode

Recommended flow:

1. Build frontend assets in `frontend/`.
2. Make `frontend/dist` available to Django static handling.
3. Serve shell and static assets from Django.
4. Keep same-origin hosting simple.

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
- Django can serve the shell page
- static asset references are stable
- deployment instructions are documented
