import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Matrix2x2, Vector2 } from '../math'

export type Matrix2DMode = 'apply' | 'add' | 'subtract' | 'scale'
export type Matrix2DDetState = 'positive' | 'negative' | 'zero_exact' | 'zero_near'

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
    label: { en: 'Identity', pl: 'Identycznosc' },
    description: {
      en: 'Identity keeps vectors and unit square unchanged.',
      pl: 'Macierz identycznosciowa nie zmienia wektorow ani kwadratu jednostkowego.',
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
      pl: 'Odbicie zmienia orientacje i daje ujemny wyznacznik.',
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
    label: { en: 'Shear', pl: 'Scinanie' },
    description: {
      en: 'Shear keeps area but slants the grid.',
      pl: 'Scinanie zachowuje pole, ale pochyla siatke.',
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
      inputVector: 'Wektor wejsciowy',
      overlays: 'Nakladki',
      basis: 'Pokaz baze',
      transformedGrid: 'Pokaz przeksztalcona siatke',
      determinant: 'Pokaz kwadrat jednostkowy i wyznacznik',
      vectorMap: 'Pokaz mapowanie wektora',
      dragHint:
        'Przeciagaj wektor wejsciowy i zmieniaj wpisy macierzy, aby laczyc zapis algebraiczny z geometria.',
      detPositive: 'Orientacja zachowana',
      detNegative: 'Orientacja odwrocona',
      detZeroExact: 'Dokladne zwiniecie pola do zera',
      detZeroNear: 'Prawie zwiniecie pola do zera',
      orientation: 'Orientacja',
      orientationPositive: 'Dodatnia',
      orientationNegative: 'Ujemna',
      orientationZeroExact: 'Dokladnie zero',
      orientationZeroNear: 'Blisko zera',
      resetView: 'Reset widoku',
      status: 'Modul interaktywny',
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
    detZeroExact: 'Area exactly collapsed to zero',
    detZeroNear: 'Area nearly collapsed to zero',
    orientation: 'Orientation',
    orientationPositive: 'Positive',
    orientationNegative: 'Negative',
    orientationZeroExact: 'Exactly zero',
    orientationZeroNear: 'Near zero',
    resetView: 'Reset view',
    status: 'Interactive module',
    sceneLabel: 'Matrix 2D scene',
  }
}

export function getMatrix2DTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Kolumny macierzy sa obrazami wektorow bazowych e1 i e2 po transformacji.',
      'Dodawanie i odejmowanie macierzy odbywa sie element po elemencie: (A +/- B)ij = Aij +/- Bij.',
      'Skalowanie macierzy mnozy kazdy element: (kA)ij = k * Aij.',
      'Dla 2x2: det(A) = a11*a22 - a12*a21. |det(A)| to skala pola, a znak mowi o orientacji.',
    ]
  }

  return [
    'Matrix columns are images of basis vectors e1 and e2 under the transformation.',
    'Matrix addition/subtraction is element-wise: (A +/- B)ij = Aij +/- Bij.',
    'Matrix scaling multiplies each entry: (kA)ij = k * Aij.',
    'For 2x2, det(A) = a11*a22 - a12*a21. |det(A)| is area scale, sign indicates orientation.',
  ]
}

export function getMatrix2DWhatToNotice(
  language: AppLanguage,
  mode: Matrix2DMode,
  determinant: number,
): string {
  const isExactZero = determinant === 0
  const isNearZero = !isExactZero && Math.abs(determinant) < 0.02

  if (language === 'pl') {
    if (mode === 'add') {
      return 'W trybie A + B kolumny wynikowe sa suma kolumn A i B.'
    }
    if (mode === 'subtract') {
      return 'W trybie A - B kolumny wynikowe sa roznica kolumn A i B.'
    }
    if (mode === 'scale') {
      return 'W trybie k*A kazdy element macierzy i cala transformacja skaluja sie przez ten sam k.'
    }
    if (isExactZero) {
      return 'Kwadrat jednostkowy zapada sie dokladnie do odcinka, bo wyznacznik jest rowny zero.'
    }
    if (isNearZero) {
      return 'Kwadrat jednostkowy prawie zapada sie do odcinka, bo wyznacznik jest bliski zeru.'
    }
    if (determinant < 0) {
      return 'Ujemny wyznacznik oznacza zmiane orientacji (odbicie).'
    }
    return 'Dodatni wyznacznik zachowuje orientacje, a jego wartosc bezwzgledna skaluje pole.'
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
  if (isExactZero) {
    return 'The unit square collapses exactly to a line because determinant equals zero.'
  }
  if (isNearZero) {
    return 'The unit square nearly collapses to a line because determinant is near zero.'
  }
  if (determinant < 0) {
    return 'Negative determinant indicates an orientation flip (reflection).'
  }
  return 'Positive determinant preserves orientation, and its magnitude scales area.'
}
