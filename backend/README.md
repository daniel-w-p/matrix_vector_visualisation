# Backend (Django Host)

This backend is intentionally thin. It currently serves the HTML shell at `/`.

## Responsibilities

- host the shell page
- prepare static serving for built frontend assets
- provide room for future API endpoints

## Local development

1. Start frontend with Vite from `frontend/`:
   - `npm run dev`
2. Start Django from `backend/`:
   - `py -3 manage.py runserver`

During active frontend work, Vite is the primary UI server.

## Production integration direction

1. Build frontend assets: `npm run build` in `frontend/`
2. Django reads static files from `frontend/dist` when that folder exists.
3. Django serves the shell route and static assets from one deployment target.
