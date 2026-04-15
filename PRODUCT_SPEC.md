# Product Specification

## 1. Product name

Working name: **Vector Lab**

## 2. Vision

Create an interactive web application that teaches linear algebra through **visual intuition**, **direct manipulation**, and **short guided experiments**.

The app should help learners understand not only *how to compute* operations, but *what those operations mean geometrically*.

## 3. Primary users

- students learning vectors and matrices for the first time
- self-learners who want visual intuition
- teachers who want a demonstrable classroom tool
- technically curious users who want to experiment, not just calculate

## 4. Core product principles

### 4.1 Not calculator-first
The interface should not feel like “enter numbers, get result”.  
It should feel like “change the object, watch the meaning”.

### 4.2 Visual meaning first
Every important numeric output should be connected to a visible geometric change.

### 4.3 Learning by trying
The app should encourage:
- dragging
- toggling views
- changing parameters
- comparing cases
- testing edge cases
- asking “what if?”

### 4.4 Progressive depth
A beginner should understand the main scene quickly.  
An advanced learner should be able to turn on more detail.

## 5. Version 1 scope

## 5.1 Vectors

Support for 2D and 3D vectors with:

- addition
- subtraction
- scaling
- dot product
- cross product

### Required teaching goals
- vector addition as composition
- subtraction as adding an opposite vector
- scaling as stretch / flip
- dot product as projection and directional agreement
- cross product as oriented area and perpendicular direction

## 5.2 Matrices

Support for 2x2 and 3x3 matrices with:

- addition
- subtraction
- scaling
- matrix–vector multiplication
- determinant interpretation

### Required teaching goals
- a matrix as a transformation
- columns as images of basis vectors
- determinant as area/volume scaling
- determinant sign as orientation information

## 5.3 Eigen concepts

Support for:

- eigenvalues
- eigenvectors
- live correctness check of `A v = λ v`

### Required teaching goals
- eigenvectors as directions preserved by a transformation
- eigenvalues as scale factors on those directions
- special-case understanding:
  - repeated eigenvalues
  - zero eigenvalue
  - negative eigenvalue
  - 2D rotation with no real eigenvectors
  - matrices that are not fully diagonalizable

## 6. Required module behaviors

## 6.1 Dot product module
Must visualize:

- angle between vectors
- cosine of that angle
- projection of one vector onto another
- positive / zero / negative cases

## 6.2 Cross product module
Must visualize:

- parallelogram spanned by two vectors
- sine of the angle
- cross-product direction
- effect of swapping operand order

## 6.3 Determinant module
Must visualize:

- unit square to parallelogram in 2D
- unit cube to parallelepiped in 3D
- scale change of area / volume
- orientation flip when determinant is negative
- collapse when determinant is zero

## 6.4 Eigen module
Must visualize:

- candidate vector
- transformed vector `A v`
- scaled vector `λ v`
- difference vector `A v - λ v`
- invariant directions when they exist

## 7. UX expectations

The app should support:

- direct manipulation of vectors and parameters
- numeric inputs for exact values
- presets for pedagogically useful cases
- compare mode for two scenarios side by side
- explanation text that updates with the scene
- optional challenge/prediction mode later

## 8. Future phase (not blocking v1)

### Jacobian / coordinate change module
A future module should explain local area scaling through the Jacobian determinant, especially for Cartesian → polar coordinates.

This belongs in phase 2, not in the initial implementation sequence.

## 9. Explicit non-goals for early versions

Do not prioritize these in v1:

- symbolic algebra
- arbitrary matrix sizes
- matrix inverse teaching flows
- advanced decomposition zoo (SVD, QR, Jordan, etc.)
- user accounts
- collaborative editing
- server-side computation service

## 10. High-level acceptance criteria

The product is directionally correct when:

- a learner can infer geometric meaning from interaction
- the same concept appears in geometric, algebraic, and verbal form
- major modules feel like related parts of one lab, not disconnected demos
- the backend remains optional for core computation
