# ADR 0001 — Web-first architecture

## Status
Accepted

## Decision
The project will be built first as a web application, not as a desktop app.

## Rationale
- easy to embed into an existing website
- near-zero server requirements for the core experience
- easier distribution to students and teachers
- natural fit for interactive client-side graphics

## Consequences
- frontend architecture becomes the primary design concern
- Django stays thin
- rendering and interactivity must work well in the browser
