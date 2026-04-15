# Backend Plan

This document describes the intended Django host application.

## Planned role

Django should initially act as a **thin host** for:

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
├─ config/
└─ vectorlab_web/
```

## Integration goal

In production, Django should be able to serve the built frontend cleanly from the same deployment target.
