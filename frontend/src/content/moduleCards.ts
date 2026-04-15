export type ModuleKey =
  | 'vector2d'
  | 'dotProduct'
  | 'matrix2d'
  | 'crossProduct3d'
  | 'matrix3d'
  | 'eigen'

export type ModuleCard = {
  id: ModuleKey
  shortLabel: string
  title: string
  description: string
}

export const moduleOrder: ModuleKey[] = [
  'vector2d',
  'dotProduct',
  'matrix2d',
  'crossProduct3d',
  'matrix3d',
  'eigen',
]

export const moduleCards: Record<ModuleKey, ModuleCard> = {
  vector2d: {
    id: 'vector2d',
    shortLabel: 'Vector 2D',
    title: 'Vector 2D',
    description: 'Vector addition, subtraction, and scaling with direct manipulation.',
  },
  dotProduct: {
    id: 'dotProduct',
    shortLabel: 'Dot Product',
    title: 'Dot Product',
    description: 'Projection and angle-alignment intuition between two vectors.',
  },
  matrix2d: {
    id: 'matrix2d',
    shortLabel: 'Matrix 2D',
    title: 'Matrix 2D',
    description: '2D matrix transformations and determinant as area scaling.',
  },
  crossProduct3d: {
    id: 'crossProduct3d',
    shortLabel: 'Cross 3D',
    title: 'Cross Product 3D',
    description: 'Perpendicular direction and oriented area in three dimensions.',
  },
  matrix3d: {
    id: 'matrix3d',
    shortLabel: 'Matrix 3D',
    title: 'Matrix 3D',
    description: '3D transformations and determinant as volume scaling.',
  },
  eigen: {
    id: 'eigen',
    shortLabel: 'Eigen',
    title: 'Eigen Concepts',
    description: 'Directions preserved by transformation and live Av = lambda v checks.',
  },
}
