import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Vector2 } from '../math'

export type ProjectionMode = 'aOnB' | 'bOnA'
export type DotSignState = 'positive' | 'zero_exact' | 'zero_near' | 'negative'

export type DotProductPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  vectorA: Vector2
  vectorB: Vector2
}

export const dotProductPresets: readonly DotProductPreset[] = [
  {
    id: 'acute',
    label: { en: 'Acute Case', pl: 'Przypadek ostry' },
    description: {
      en: 'Angle less than 90 degrees gives a positive dot product.',
      pl: 'Kat mniejszy niz 90 stopni daje dodatni iloczyn skalarny.',
    },
    vectorA: [3, 1.5],
    vectorB: [2.5, 2.2],
  },
  {
    id: 'right',
    label: { en: 'Right Angle', pl: 'Kat prosty' },
    description: {
      en: 'Perpendicular vectors give dot product equal to zero.',
      pl: 'Wektory prostopadle daja iloczyn skalarny rowny zero.',
    },
    vectorA: [3, 0],
    vectorB: [0, 2.5],
  },
  {
    id: 'obtuse',
    label: { en: 'Obtuse Case', pl: 'Przypadek rozwarty' },
    description: {
      en: 'Angle greater than 90 degrees gives a negative dot product.',
      pl: 'Kat wiekszy niz 90 stopni daje ujemny iloczyn skalarny.',
    },
    vectorA: [3, 1],
    vectorB: [-2.4, 1.8],
  },
]

export function getDotProductUIText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      controls: 'Sterowanie i presety',
      algebra: 'Widok algebraiczny',
      projectionMode: 'Kierunek rzutu',
      vectorA: 'Wektor a',
      vectorB: 'Wektor b',
      aOnB: 'Rzut a na b',
      bOnA: 'Rzut b na a',
      showAngle: 'Pokaz kat',
      showCosine: 'Pokaz cos(theta)',
      unitTarget: 'Tryb wektora jednostkowego celu',
      dragHint:
        'Przeciagaj koncowki wektorow a i b, aby obserwowac zmiane znaku iloczynu skalarnego.',
      signPositive: 'Dodatni',
      signZeroExact: 'Dokladnie zero',
      signZeroNear: 'Bliski zera',
      signNegative: 'Ujemny',
      projectionLabel: 'Rzut',
      unitTargetLabel: 'u',
      resetView: 'Reset widoku',
      status: 'Modul interaktywny',
      vectorSceneLabel: 'Scena iloczynu skalarnego',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    projectionMode: 'Projection direction',
    vectorA: 'Vector a',
    vectorB: 'Vector b',
    aOnB: 'Project a onto b',
    bOnA: 'Project b onto a',
    showAngle: 'Show angle',
    showCosine: 'Show cos(theta)',
    unitTarget: 'Use unit target mode',
    dragHint: 'Drag vector endpoints a and b to observe how dot-product sign changes.',
    signPositive: 'Positive',
    signZeroExact: 'Exactly zero',
    signZeroNear: 'Near zero',
    signNegative: 'Negative',
    projectionLabel: 'proj',
    unitTargetLabel: 'u',
    resetView: 'Reset view',
    status: 'Interactive module',
    vectorSceneLabel: 'Dot product scene',
  }
}

export function getDotProductTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Iloczyn skalarny w 2D liczymy elementami:',
      'a·b = a₁b₁ + a₂b₂.',
      'Przykład:',
      '[2, 1]·[3, -2] = 2·3 + 1·(-2) = 4.',
      'Równoważnie:',
      'a·b = |a||b|cos(θ).',
      'Związek z rzutem wektora na kierunek b:',
      'proj_b(a) = (a·b / |b|²)b.',
    ]
  }

  return [
    'In 2D, dot product is component-wise:',
    'a·b = a₁b₁ + a₂b₂.',
    'Example:',
    '[2, 1]·[3, -2] = 2·3 + 1·(-2) = 4.',
    'Equivalent form:',
    'a·b = |a||b|cos(θ).',
    'Relation to projection on direction b:',
    'proj_b(a) = (a·b / |b|²)b.',
  ]
}

export function getDotProductWhatToNotice(
  language: AppLanguage,
  signState: DotSignState,
  projectionMode: ProjectionMode,
): string {
  if (language === 'pl') {
    if (signState === 'positive') {
      return projectionMode === 'aOnB'
        ? 'Rzut a na b ma zgodny zwrot z b, wiec iloczyn skalarny jest dodatni.'
        : 'Rzut b na a ma zgodny zwrot z a, wiec iloczyn skalarny jest dodatni.'
    }
    if (signState === 'zero_exact') {
      return 'Wektory sa prostopadle, wiec iloczyn skalarny jest dokladnie rowny zero.'
    }
    if (signState === 'zero_near') {
      return 'Wektory sa blisko prostopadlosci, wiec iloczyn skalarny jest bliski zeru.'
    }
    return 'Rzut ma przeciwny zwrot do wektora celu, wiec iloczyn skalarny jest ujemny.'
  }

  if (signState === 'positive') {
    return projectionMode === 'aOnB'
      ? 'Projection of a onto b points with b, so the dot product is positive.'
      : 'Projection of b onto a points with a, so the dot product is positive.'
  }
  if (signState === 'zero_exact') {
    return 'Vectors are perpendicular, so the dot product is exactly zero.'
  }
  if (signState === 'zero_near') {
    return 'Vectors are near perpendicular, so the dot product is near zero.'
  }
  return 'Projection points opposite to the target direction, so the dot product is negative.'
}