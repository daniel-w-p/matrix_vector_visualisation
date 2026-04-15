# Module Spec — Vector 2D

## Goal
Teach vector addition, subtraction, and scaling through direct manipulation.

## Main intuition
A vector is not just a pair of numbers. It is a directed quantity with length and direction.

## Core visuals

- coordinate plane
- one or more vectors from the origin
- optional tail-to-head composition view
- optional parallelogram view for addition
- component decomposition labels

## Required interactions

- drag vector endpoints
- enter exact numeric values
- choose operation: add / subtract / scale
- scalar slider with positive, fractional, and negative values
- toggle between composition views

## What the learner should notice

- addition combines displacement
- subtraction means adding the opposite
- scaling changes magnitude
- negative scaling flips direction
- zero scaling collapses the vector

## Acceptance criteria

- vector motion is smooth
- displayed coordinates update live
- algebra panel stays synchronized with the scene
- switching between add/subtract/scale feels coherent, not like separate mini-apps

## Tests to expect

- vector arithmetic correctness
- drag-to-value mapping
- scalar sign behavior
- view toggle behavior
