import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Vector2 } from '../math'

export type Vector2DOperation = 'add' | 'subtract' | 'scale'
export type Vector2DViewMode = 'tailToHead' | 'parallelogram'

export type Vector2DPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  operation: Vector2DOperation
  vectorA: Vector2
  vectorB: Vector2
  scalar: number
  viewMode: Vector2DViewMode
}

export const vector2DPresets: readonly Vector2DPreset[] = [
  {
    id: 'walk-east-north',
    label: { en: 'Walk East + North', pl: 'Ruch na wschĂłd + pĂłĹ‚noc' },
    description: {
      en: 'Two displacements combine into one net displacement.',
      pl: 'Dwa przemieszczenia skĹ‚adajÄ… siÄ™ na jedno przemieszczenie wypadkowe.',
    },
    operation: 'add',
    vectorA: [3, 1],
    vectorB: [1.5, 2.5],
    scalar: 1,
    viewMode: 'tailToHead',
  },
  {
    id: 'difference-opposite',
    label: { en: 'Difference via Opposite', pl: 'RĂłĹĽnica przez wektor przeciwny' },
    description: {
      en: 'Subtraction is addition with the opposite of the second vector.',
      pl: 'Odejmowanie to dodawanie wektora przeciwnego do drugiego wektora.',
    },
    operation: 'subtract',
    vectorA: [3, 2],
    vectorB: [2, 3],
    scalar: 1,
    viewMode: 'tailToHead',
  },
  {
    id: 'negative-scale-flip',
    label: { en: 'Negative Scale Flip', pl: 'Ujemne skalowanie i odwrĂłcenie' },
    description: {
      en: 'A negative scalar flips direction and rescales magnitude.',
      pl: 'Ujemny skalar odwraca kierunek i przeskalowuje dĹ‚ugoĹ›Ä‡.',
    },
    operation: 'scale',
    vectorA: [2.5, -1.5],
    vectorB: [1, 1],
    scalar: -1.5,
    viewMode: 'parallelogram',
  },
  {
    id: 'zero-collapse',
    label: { en: 'Zero Collapse', pl: 'Zanik przy zerze' },
    description: {
      en: 'Scaling by zero collapses the vector to the origin.',
      pl: 'Skalowanie przez zero zwija wektor do poczÄ…tku ukĹ‚adu.',
    },
    operation: 'scale',
    vectorA: [-3, 2],
    vectorB: [1, 0],
    scalar: 0,
    viewMode: 'tailToHead',
  },
]

export function getWhatToNoticeVector2D(
  language: AppLanguage,
  operation: Vector2DOperation,
  scalar: number,
): string {
  if (operation === 'add') {
    return language === 'pl'
      ? 'ZwrĂłÄ‡ uwagÄ™, ĹĽe wynik trafia na koniec Ĺ›cieĹĽki tail-to-head. To skĹ‚adanie dwĂłch przemieszczeĹ„.'
      : 'Notice how the result lands at the end of the tail-to-head path. You are composing two displacements.'
  }

  if (operation === 'subtract') {
    return language === 'pl'
      ? 'W odejmowaniu a - b dziaĹ‚a jak a + (-b). Wektor przeciwny ma dokĹ‚adnie odwrĂłcony kierunek.'
      : 'In subtraction, a - b behaves like a + (-b). The opposite vector has exactly reversed direction.'
  }

  if (scalar === 0) {
    return language === 'pl'
      ? 'Skalowanie przez zero zwija wektor do poczÄ…tku ukĹ‚adu, wiÄ™c kierunek przestaje byÄ‡ okreĹ›lony.'
      : 'Scaling by zero collapses the vector to the origin, so direction is no longer defined.'
  }

  if (scalar < 0) {
    return language === 'pl'
      ? 'Ujemne skalowanie odwraca kierunek i skaluje dĹ‚ugoĹ›Ä‡ przez |k|.'
      : 'Negative scaling flips direction and rescales magnitude by |k|.'
  }

  if (scalar > 0 && scalar < 1) {
    return language === 'pl'
      ? 'Dodatnie skalowanie mniejsze od 1 zachowuje kierunek, ale skraca wektor.'
      : 'Positive scaling below 1 keeps direction while shrinking magnitude.'
  }

  return language === 'pl'
    ? 'Dodatnie skalowanie wiÄ™ksze od 1 zachowuje kierunek i wydĹ‚uĹĽa wektor.'
    : 'Positive scaling above 1 keeps direction while stretching magnitude.'
}

export function getVector2DTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Dodawanie i odejmowanie wektorów wykonujemy elementami: [a₁, a₂] ± [b₁, b₂] = [a₁ ± b₁, a₂ ± b₂].',
      'Przykład: [2, 1] + [3, -2] = [5, -1].',
      'Skalowanie mnoży każdą składową przez ten sam skalar: k[a₁, a₂] = [ka₁, ka₂].',
      'Przykład: -1.5 * [2, -4] = [-3, 6].',
    ]
  }

  return [
    'Vector addition and subtraction are component-wise: [a₁, a₂] ± [b₁, b₂] = [a₁ ± b₁, a₂ ± b₂].',
    'Example: [2, 1] + [3, -2] = [5, -1].',
    'Scalar multiplication multiplies each component by the same scalar: k[a₁, a₂] = [ka₁, ka₂].',
    'Example: -1.5 * [2, -4] = [-3, 6].',
  ]
}
export function getVector2DUIText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      controlsAndPresets: 'Sterowanie i presety',
      operationAdd: 'Dodawanie',
      operationSubtract: 'Odejmowanie',
      operationScale: 'Skalowanie',
      viewTailToHead: 'Tail-to-head',
      viewParallelogram: 'RĂłwnolegĹ‚obok',
      scaleFactor: 'WspĂłĹ‚czynnik skali k',
      dragHintPrefix: 'PrzeciÄ…gaj punkty',
      dragHintConnector: 'i',
      dragHintSuffix: 'na scenie, aby badaÄ‡ operacje bezpoĹ›rednio.',
      algebraView: 'Widok algebraiczny',
      resultLabel: 'Wynik jako zĹ‚oĹĽenie',
      vectorSceneLabel: 'Scena wektorowa 2D',
      status: 'ModuĹ‚ interaktywny',
    }
  }

  return {
    controlsAndPresets: 'Controls and Presets',
    operationAdd: 'Add',
    operationSubtract: 'Subtract',
    operationScale: 'Scale',
    viewTailToHead: 'Tail-to-head',
    viewParallelogram: 'Parallelogram',
    scaleFactor: 'Scale factor k',
    dragHintPrefix: 'Drag points',
    dragHintConnector: 'and',
    dragHintSuffix: 'in the scene to explore direct manipulation.',
    algebraView: 'Algebra View',
    resultLabel: 'Result as composition',
    vectorSceneLabel: 'Vector 2D scene',
    status: 'Interactive module',
  }
}
