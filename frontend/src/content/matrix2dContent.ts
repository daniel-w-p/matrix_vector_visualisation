import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Matrix2x2, Vector2 } from '../math'

export type Matrix2DMode = 'apply' | 'add' | 'subtract' | 'scale'

export type Matrix2DPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  mode: Matrix2DMode
  matrixA: Matrix2x2
  matrixB: Matrix2x2
  scalar: number
  inputVector: Vector2
}

export const matrix2DPresets: readonly Matrix2DPreset[] = [
  {
    id: 'identity',
    label: { en: 'Identity', pl: 'Identyczność' },
    description: {
      en: 'Identity keeps vectors and unit square unchanged.',
      pl: 'Macierz identycznościowa nie zmienia wektorów ani kwadratu jednostkowego.',
    },
    mode: 'apply',
    matrixA: [
      [1, 0],
      [0, 1],
    ],
    matrixB: [
      [1, 0],
      [0, 1],
    ],
    scalar: 1,
    inputVector: [2, 1],
  },
  {
    id: 'reflection',
    label: { en: 'Reflection', pl: 'Odbicie' },
    description: {
      en: 'Reflection changes orientation and gives negative determinant.',
      pl: 'Odbicie zmienia orientację i daje ujemny wyznacznik.',
    },
    mode: 'apply',
    matrixA: [
      [1, 0],
      [0, -1],
    ],
    matrixB: [
      [1, 0],
      [0, 1],
    ],
    scalar: 1,
    inputVector: [2, 1],
  },
  {
    id: 'shear',
    label: { en: 'Shear', pl: 'Ścinanie' },
    description: {
      en: 'Shear keeps area but slants the grid.',
      pl: 'Ścinanie zachowuje pole, ale pochyla siatkę.',
    },
    mode: 'apply',
    matrixA: [
      [1, 1.2],
      [0, 1],
    ],
    matrixB: [
      [1, 0],
      [0, 1],
    ],
    scalar: 1,
    inputVector: [2, 1],
  },
  {
    id: 'singular',
    label: { en: 'Singular', pl: 'Osobliwa' },
    description: {
      en: 'Singular matrix collapses area to zero.',
      pl: 'Macierz osobliwa zwija pole do zera.',
    },
    mode: 'apply',
    matrixA: [
      [1, 2],
      [2, 4],
    ],
    matrixB: [
      [1, 0],
      [0, 1],
    ],
    scalar: 1,
    inputVector: [2, 1],
  },
]

export function getMatrix2DUIText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      controls: 'Sterowanie i presety',
      algebra: 'Widok algebraiczny',
      modeLabel: 'Tryb pracy',
      apply: 'A * v',
      add: 'A + B',
      subtract: 'A - B',
      scale: 'k * A',
      matrixA: 'Macierz A',
      matrixB: 'Macierz B',
      scalar: 'Skalar k',
      inputVector: 'Wektor wejściowy',
      overlays: 'Nakładki',
      basis: 'Pokaż bazę',
      transformedGrid: 'Pokaż przekształconą siatkę',
      determinant: 'Pokaż kwadrat jednostkowy i wyznacznik',
      vectorMap: 'Pokaż mapowanie wektora',
      dragHint:
        'Przeciągaj wektor wejściowy i zmieniaj wpisy macierzy, aby łączyć zapis algebraiczny z geometrią.',
      detPositive: 'Orientacja zachowana',
      detNegative: 'Orientacja odwrócona',
      detZero: 'Zwinięcie pola do zera',
      status: 'Moduł interaktywny',
      sceneLabel: 'Scena macierzy 2D',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    modeLabel: 'Mode',
    apply: 'A * v',
    add: 'A + B',
    subtract: 'A - B',
    scale: 'k * A',
    matrixA: 'Matrix A',
    matrixB: 'Matrix B',
    scalar: 'Scalar k',
    inputVector: 'Input vector',
    overlays: 'Overlays',
    basis: 'Show basis',
    transformedGrid: 'Show transformed grid',
    determinant: 'Show unit square and determinant',
    vectorMap: 'Show vector mapping',
    dragHint:
      'Drag the input vector and update matrix entries to link algebraic form with geometry.',
    detPositive: 'Orientation preserved',
    detNegative: 'Orientation flipped',
    detZero: 'Area collapsed to zero',
    status: 'Interactive module',
    sceneLabel: 'Matrix 2D scene',
  }
}

export function getMatrix2DTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Kolumny macierzy są obrazami wektorów bazowych e₁ i e₂ po transformacji.',
      'Dodawanie i odejmowanie macierzy odbywa się element po elemencie: (A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ.',
      'Skalowanie macierzy mnoży każdy element: (kA)ᵢⱼ = k * Aᵢⱼ.',
      'Dla 2x2: det(A) = a₁₁*a₂₂ - a₁₂*a₂₁. |det(A)| to skala pola, a znak mówi o orientacji.',
    ]
  }

  return [
    'Matrix columns are images of basis vectors e₁ and e₂ under the transformation.',
    'Matrix addition/subtraction is element-wise: (A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ.',
    'Matrix scaling multiplies each entry: (kA)ᵢⱼ = k * Aᵢⱼ.',
    'For 2x2, det(A) = a₁₁*a₂₂ - a₁₂*a₂₁. |det(A)| is area scale, sign indicates orientation.',
  ]
}

export function getMatrix2DWhatToNotice(
  language: AppLanguage,
  mode: Matrix2DMode,
  determinant: number,
): string {
  if (language === 'pl') {
    if (mode === 'add') {
      return 'W trybie A + B zwróć uwagę, że kolumny wynikowe są sumą kolumn A i B.'
    }
    if (mode === 'subtract') {
      return 'W trybie A - B kolumny wynikowe są różnicą kolumn A i B, co widać na bazie i siatce.'
    }
    if (mode === 'scale') {
      return 'W trybie k*A każdy element macierzy i cała transformacja skalują się przez ten sam k.'
    }
    if (Math.abs(determinant) < 0.02) {
      return 'Kwadrat jednostkowy zapada się do odcinka, bo wyznacznik jest bliski zeru.'
    }
    if (determinant < 0) {
      return 'Ujemny wyznacznik oznacza zmianę orientacji (odbicie).'
    }
    return 'Dodatni wyznacznik zachowuje orientację, a jego wartość bezwzględna skaluje pole.'
  }

  if (mode === 'add') {
    return 'In A + B mode, resulting columns are component-wise sums of columns from A and B.'
  }
  if (mode === 'subtract') {
    return 'In A - B mode, resulting columns are component-wise differences of columns from A and B.'
  }
  if (mode === 'scale') {
    return 'In k*A mode, every matrix entry and the whole transformation scale by the same k.'
  }
  if (Math.abs(determinant) < 0.02) {
    return 'The unit square collapses toward a line because determinant is near zero.'
  }
  if (determinant < 0) {
    return 'Negative determinant indicates an orientation flip (reflection).'
  }
  return 'Positive determinant preserves orientation, and its magnitude scales area.'
}
