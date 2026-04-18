import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Matrix3x3, Vector3 } from '../math'

export type Matrix3DMode = 'apply' | 'add' | 'subtract' | 'scale'

export type Matrix3DPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  mode: Matrix3DMode
  matrixA: Matrix3x3
  matrixB: Matrix3x3
  scalar: number
  inputVector: Vector3
}

export const matrix3DPresets: readonly Matrix3DPreset[] = [
  {
    id: 'identity',
    label: { en: 'Identity', pl: 'Identycznosc' },
    description: {
      en: 'Identity keeps basis, vectors, and unit cube unchanged.',
      pl: 'Macierz identycznosciowa nie zmienia bazy, wektorow ani szescianu jednostkowego.',
    },
    mode: 'apply',
    matrixA: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    matrixB: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    scalar: 1,
    inputVector: [1.5, 1.2, 0.8],
  },
  {
    id: 'axis-scale',
    label: { en: 'Axis scaling', pl: 'Skalowanie osiowe' },
    description: {
      en: 'Different axis scales change volume by determinant.',
      pl: 'Rozne skale osi zmieniaja objetosc zgodnie z wyznacznikiem.',
    },
    mode: 'apply',
    matrixA: [
      [2, 0, 0],
      [0, 1.5, 0],
      [0, 0, 0.5],
    ],
    matrixB: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    scalar: 1,
    inputVector: [1.4, 1, 1.2],
  },
  {
    id: 'reflection',
    label: { en: 'Reflection', pl: 'Odbicie' },
    description: {
      en: 'Reflection flips orientation and gives negative determinant.',
      pl: 'Odbicie odwraca orientacje i daje ujemny wyznacznik.',
    },
    mode: 'apply',
    matrixA: [
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, 1],
    ],
    matrixB: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    scalar: 1,
    inputVector: [1.1, 1.4, 1],
  },
  {
    id: 'singular',
    label: { en: 'Singular', pl: 'Osobliwa' },
    description: {
      en: 'Singular matrix collapses unit cube volume to zero.',
      pl: 'Macierz osobliwa zeruje objetosc szescianu jednostkowego.',
    },
    mode: 'apply',
    matrixA: [
      [1, 2, 0],
      [2, 4, 0],
      [0, 0, 1],
    ],
    matrixB: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    scalar: 1,
    inputVector: [1.2, 0.8, 1.3],
  },
]

export function getMatrix3DUIText(language: AppLanguage) {
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
      basis: 'Pokaz baze i obrazy bazy',
      unitCube: 'Pokaz szescian jednostkowy i obraz',
      vectorMap: 'Pokaz mapowanie wektora',
      dragHint:
        'Obracaj scene i zmieniaj wpisy macierzy, aby laczyc zapis algebraiczny z transformacja 3D.',
      detPositive: 'Dodatni wyznacznik: orientacja zachowana',
      detNegative: 'Ujemny wyznacznik: orientacja odwrocona',
      detZeroExact: 'Wyznacznik rowny zero: objetosc zapadnieta',
      detZeroNear: 'Wyznacznik bliski zeru: objetosc prawie zapadnieta',
      orientation: 'Orientacja',
      orientationPositive: 'Dodatnia',
      orientationNegative: 'Ujemna',
      orientationZeroExact: 'Dokladnie zero',
      orientationZeroNear: 'Blisko zera',
      sceneLabel: 'Scena macierzy 3D',
      status: 'Modul interaktywny',
      resetView: 'Reset widoku',
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
    basis: 'Show basis and transformed basis',
    unitCube: 'Show unit cube and transformed shape',
    vectorMap: 'Show vector mapping',
    dragHint:
      'Orbit the scene and update matrix entries to connect algebraic form with 3D transformation.',
    detPositive: 'Positive determinant: orientation preserved',
    detNegative: 'Negative determinant: orientation flipped',
    detZeroExact: 'Determinant equals zero: volume collapsed',
    detZeroNear: 'Near-zero determinant: volume almost collapsed',
    orientation: 'Orientation',
    orientationPositive: 'Positive',
    orientationNegative: 'Negative',
    orientationZeroExact: 'Exactly zero',
    orientationZeroNear: 'Near zero',
    sceneLabel: 'Matrix 3D scene',
    status: 'Interactive module',
    resetView: 'Reset view',
  }
}

export function getMatrix3DTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Kolumny macierzy 3x3 to obrazy wektorów bazowych e₁, e₂ i e₃.',
      'Dodawanie i odejmowanie macierzy są elementowe:',
      '(A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ.',
      'Skalowanie mnoży każdy element:',
      '(kA)ᵢⱼ = kAᵢⱼ.',
      'Wyznacznik 3x3 opisuje skalę objętości i orientację przekształcenia.',
    ]
  }

  return [
    'Columns of a 3x3 matrix are images of basis vectors e₁, e₂, and e₃.',
    'Matrix addition and subtraction are element-wise:',
    '(A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ.',
    'Scaling multiplies each entry:',
    '(kA)ᵢⱼ = kAᵢⱼ.',
    'Determinant of 3x3 gives volume scale and orientation of the transformation.',
  ]
}

export function getMatrix3DWhatToNotice(
  language: AppLanguage,
  mode: Matrix3DMode,
  determinant: number,
): string {
  const isExactZero = determinant === 0
  const isNearZero = !isExactZero && Math.abs(determinant) < 0.02

  if (language === 'pl') {
    if (mode === 'add') {
      return 'W trybie A + B kazda kolumna wyniku to suma odpowiednich kolumn A i B.'
    }
    if (mode === 'subtract') {
      return 'W trybie A - B kazda kolumna wyniku to roznica odpowiednich kolumn A i B.'
    }
    if (mode === 'scale') {
      return 'W trybie k*A kazda kolumna skaluje sie tym samym wspolczynnikiem k.'
    }
    if (isExactZero) {
      return 'Objetosc bryly zapada sie dokladnie, bo wyznacznik jest rowny zero.'
    }
    if (isNearZero) {
      return 'Objetosc bryly prawie zapada sie, bo wyznacznik jest bliski zeru.'
    }
    if (determinant < 0) {
      return 'Ujemny wyznacznik oznacza odwrocenie orientacji bryly.'
    }
    return 'Dodatni wyznacznik zachowuje orientacje, a jego modul skaluje objetosc.'
  }

  if (mode === 'add') {
    return 'In A + B mode, each result column is a sum of corresponding columns from A and B.'
  }
  if (mode === 'subtract') {
    return 'In A - B mode, each result column is a difference of corresponding columns from A and B.'
  }
  if (mode === 'scale') {
    return 'In k*A mode, every column scales by the same scalar k.'
  }
  if (isExactZero) {
    return 'Volume collapses exactly because determinant equals zero.'
  }
  if (isNearZero) {
    return 'Volume almost collapses because determinant is near zero.'
  }
  if (determinant < 0) {
    return 'Negative determinant indicates orientation flip of the shape.'
  }
  return 'Positive determinant preserves orientation, and its magnitude scales volume.'
}
