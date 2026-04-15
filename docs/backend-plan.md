# Backend Plan

This document describes the intended Django host application.

## Planned role

Django should act as a thin host for:

- the HTML shell
- collected frontend static assets
- optional future API endpoints

## Early non-goals

- server-side math
- server-side rendering of scenes
- persistent user data unless explicitly added later

## Planned structure

```text
backend/
|- config/
`- vectorlab_web/
```

## Current scaffold status

- `backend/config/` contains project settings and URL routing.
- `backend/vectorlab_web/` serves the host shell route at `/`.
- The backend remains API-free at this stage.

## Dev and production fit

- Development: run Vite and Django separately; Vite is the main frontend loop.
- Production: build `frontend/dist`, then serve shell and static assets via Django.
