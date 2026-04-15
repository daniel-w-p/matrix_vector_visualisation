# Module Spec — Dot Product

## Goal
Teach the dot product as projection, directional agreement, and `|a||b|cos(θ)`.

## Main intuition
The dot product measures how much one vector points along another.

## Core visuals

- vectors `a` and `b`
- angle arc between them
- projection of one vector onto the other
- optional normalized target vector
- sign indicator for positive / zero / negative result

## Required interactions

- drag both vectors
- toggle projection direction
- toggle display of angle and cosine
- presets for acute, right, and obtuse cases
- optional “unit target vector” mode

## What the learner should notice

- if vectors align, dot product is positive
- if they are perpendicular, dot product is zero
- if they oppose each other beyond 90°, dot product is negative
- projection length and cosine are tied to the result

## Acceptance criteria

- projection is visually tied to the formula
- the sign change is obvious as the angle crosses 90°
- the module is understandable without requiring the user to compute anything manually

## Tests to expect

- dot product correctness
- projection helper correctness
- sign-state threshold handling
- preset loading
