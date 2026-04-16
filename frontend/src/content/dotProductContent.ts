import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Vector2 } from '../math'

export type ProjectionMode = 'aOnB' | 'bOnA'

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
      pl: 'KÄ…t mniejszy niĹĽ 90 stopni daje dodatni iloczyn skalarny.',
    },
    vectorA: [3, 1.5],
    vectorB: [2.5, 2.2],
  },
  {
    id: 'right',
    label: { en: 'Right Angle', pl: 'KÄ…t prosty' },
    description: {
      en: 'Perpendicular vectors give dot product near zero.',
      pl: 'Wektory prostopadĹ‚e dajÄ… iloczyn skalarny bliski zeru.',
    },
    vectorA: [3, 0],
    vectorB: [0, 2.5],
  },
  {
    id: 'obtuse',
    label: { en: 'Obtuse Case', pl: 'Przypadek rozwarty' },
    description: {
      en: 'Angle greater than 90 degrees gives a negative dot product.',
      pl: 'KÄ…t wiÄ™kszy niĹĽ 90 stopni daje ujemny iloczyn skalarny.',
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
      aOnB: 'Rzut a na b',
      bOnA: 'Rzut b na a',
      showAngle: 'PokaĹĽ kÄ…t',
      showCosine: 'PokaĹĽ cos(theta)',
      unitTarget: 'Tryb wektora jednostkowego celu',
      dragHint: 'PrzeciÄ…gaj koĹ„cĂłwki wektorĂłw a i b, aby obserwowaÄ‡ zmianÄ™ znaku iloczynu skalarnego.',
      signPositive: 'Dodatni',
      signZero: 'Bliski zera',
      signNegative: 'Ujemny',
      projectionLabel: 'Rzut',
      unitTargetLabel: 'u',
      status: 'ModuĹ‚ interaktywny',
      vectorSceneLabel: 'Scena iloczynu skalarnego',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    projectionMode: 'Projection direction',
    aOnB: 'Project a onto b',
    bOnA: 'Project b onto a',
    showAngle: 'Show angle',
    showCosine: 'Show cos(theta)',
    unitTarget: 'Use unit target mode',
    dragHint: 'Drag vector endpoints a and b to observe how dot-product sign changes.',
    signPositive: 'Positive',
    signZero: 'Near zero',
    signNegative: 'Negative',
    projectionLabel: 'proj',
    unitTargetLabel: 'u',
    status: 'Interactive module',
    vectorSceneLabel: 'Dot product scene',
  }
}

export function getDotProductTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Iloczyn skalarny w 2D liczymy elementami: a·b = a₁b₁ + a₂b₂.',
      'Przykład: [2, 1]·[3, -2] = 2*3 + 1*(-2) = 4.',
      'Równoważnie: a·b = |a||b|cos(theta), więc znak zależy od kąta między wektorami.',
      'Rzut wektora na kierunek celu pokazuje, „ile” wektor idzie wzdłuż tego kierunku.',
    ]
  }

  return [
    'In 2D, dot product is component-wise: a·b = a₁b₁ + a₂b₂.',
    'Example: [2, 1]·[3, -2] = 2*3 + 1*(-2) = 4.',
    'Equivalent form: a·b = |a||b|cos(theta), so sign depends on the angle between vectors.',
    'Projection visualizes how much one vector points along the target direction.',
  ]
}
export function getDotProductWhatToNotice(
  language: AppLanguage,
  signState: 'positive' | 'zero' | 'negative',
  projectionMode: ProjectionMode,
): string {
  if (language === 'pl') {
    if (signState === 'positive') {
      return projectionMode === 'aOnB'
        ? 'Rzut a na b ma zgodny zwrot z b, wiÄ™c iloczyn skalarny jest dodatni.'
        : 'Rzut b na a ma zgodny zwrot z a, wiÄ™c iloczyn skalarny jest dodatni.'
    }
    if (signState === 'zero') {
      return 'Wektory sÄ… blisko prostopadĹ‚oĹ›ci, wiÄ™c iloczyn skalarny jest bliski zera.'
    }
    return 'Rzut ma przeciwny zwrot do wektora celu, wiÄ™c iloczyn skalarny jest ujemny.'
  }

  if (signState === 'positive') {
    return projectionMode === 'aOnB'
      ? 'Projection of a onto b points with b, so the dot product is positive.'
      : 'Projection of b onto a points with a, so the dot product is positive.'
  }
  if (signState === 'zero') {
    return 'Vectors are near perpendicular, so the dot product is near zero.'
  }
  return 'Projection points opposite to the target direction, so the dot product is negative.'
}
