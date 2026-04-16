import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Vector3 } from '../math'

export type CrossProduct3DPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  vectorA: Vector3
  vectorB: Vector3
}

export const crossProduct3DPresets: readonly CrossProduct3DPreset[] = [
  {
    id: 'parallel',
    label: { en: 'Parallel vectors', pl: 'Wektory równoległe' },
    description: {
      en: 'Cross product should vanish when vectors are parallel.',
      pl: 'Iloczyn wektorowy zanika, gdy wektory są równoległe.',
    },
    vectorA: [2, 1, 0],
    vectorB: [4, 2, 0],
  },
  {
    id: 'perpendicular',
    label: { en: 'Perpendicular vectors', pl: 'Wektory prostopadłe' },
    description: {
      en: 'For fixed lengths, area is largest near 90 degrees.',
      pl: 'Dla stałych długości pole jest największe blisko 90 stopni.',
    },
    vectorA: [2, 0, 0],
    vectorB: [0, 2, 0],
  },
  {
    id: 'general',
    label: { en: 'General case', pl: 'Przypadek ogólny' },
    description: {
      en: 'Both area and normal direction are non-trivial.',
      pl: 'Pole i kierunek normalny są nietrywialne.',
    },
    vectorA: [2.2, 1.2, 0.7],
    vectorB: [0.8, 1.9, 1.4],
  },
]

export function getCrossProduct3DUIText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      controls: 'Sterowanie i presety',
      algebra: 'Widok algebraiczny',
      sceneLabel: 'Scena iloczynu wektorowego 3D',
      swapOrder: 'Zamień kolejność (a × b ↔ b × a)',
      showParallelogram: 'Pokaż równoległobok',
      showSine: 'Pokaż zależność sinusową',
      showOppositeNormal: 'Pokaż przeciwny zwrot',
      vectorA: 'Wektor a',
      vectorB: 'Wektor b',
      readoutTitle: 'Odczyt sceny',
      readoutOrder: 'Kolejność',
      readoutArea: 'Pole',
      readoutAngle: 'Kąt',
      readoutSine: 'sin(theta)',
      readoutParallel: 'Stan',
      stateParallel: 'Równoległe',
      stateGeneral: 'Ogólny',
      dragHint:
        'Obracaj scenę myszą i zmieniaj współrzędne a, b, aby zobaczyć jak zmienia się pole i normalna.',
      status: 'Moduł interaktywny',
      operationAB: 'a × b',
      operationBA: 'b × a',
      oppositeHint: 'Po zamianie kolejności wynik odwraca kierunek.',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    sceneLabel: 'Cross product 3D scene',
    swapOrder: 'Swap order (a × b ↔ b × a)',
    showParallelogram: 'Show parallelogram',
    showSine: 'Show sine relation',
    showOppositeNormal: 'Show opposite normal',
    vectorA: 'Vector a',
    vectorB: 'Vector b',
    readoutTitle: 'Scene Readout',
    readoutOrder: 'Order',
    readoutArea: 'Area',
    readoutAngle: 'Angle',
    readoutSine: 'sin(theta)',
    readoutParallel: 'State',
    stateParallel: 'Parallel',
    stateGeneral: 'General',
    dragHint:
      'Orbit the scene and update coordinates of a and b to see area and normal direction change together.',
    status: 'Interactive module',
    operationAB: 'a × b',
    operationBA: 'b × a',
    oppositeHint: 'Swapping order flips the result direction.',
  }
}

export function getCrossProduct3DTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Iloczyn wektorowy ma postać: a × b = [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁].',
      '|a × b| = |a||b|sin(theta), więc długość wyniku to pole równoległoboku.',
      'Gdy wektory są równoległe, sin(theta) = 0, więc a × b = 0.',
      'Zamiana kolejności odwraca wynik: b × a = -(a × b).',
    ]
  }

  return [
    'Cross product is: a × b = [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁].',
    '|a × b| = |a||b|sin(theta), so the result magnitude is parallelogram area.',
    'When vectors are parallel, sin(theta) = 0, so a × b = 0.',
    'Swapping order flips direction: b × a = -(a × b).',
  ]
}

export function getCrossProduct3DWhatToNotice(
  language: AppLanguage,
  isSwapped: boolean,
  isParallel: boolean,
): string {
  if (language === 'pl') {
    if (isParallel) {
      return 'Wektory są prawie równoległe, więc pole i długość wektora normalnego są bliskie zeru.'
    }
    if (isSwapped) {
      return 'Po zamianie kolejności kierunek normalnej odwraca się, choć pole pozostaje takie samo.'
    }
    return 'Wektor a × b jest prostopadły do a i b, a jego długość odpowiada polu równoległoboku.'
  }

  if (isParallel) {
    return 'Vectors are nearly parallel, so both area and normal magnitude approach zero.'
  }
  if (isSwapped) {
    return 'After swapping order, the normal flips direction while the area stays the same.'
  }
  return 'Vector a × b is perpendicular to both a and b, and its magnitude equals parallelogram area.'
}
