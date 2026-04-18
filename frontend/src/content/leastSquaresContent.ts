import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Vector2 } from '../math'

export type LeastSquaresPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  samples: readonly [Vector2, Vector2, Vector2, Vector2]
}

export const leastSquaresPresets: readonly LeastSquaresPreset[] = [
  {
    id: 'no-exact-solution',
    label: { en: 'No exact solution', pl: 'Brak rozwiązania dokładnego' },
    description: {
      en: 'Typical overdetermined case: residual stays non-zero.',
      pl: 'Typowy przypadek nadokreślony: residuum pozostaje niezerowe.',
    },
    samples: [
      [-4, -0.8],
      [-1.5, 2.1],
      [1.2, 1.7],
      [3.8, 4.9],
    ],
  },
  {
    id: 'exact',
    label: { en: 'Exact solution', pl: 'Rozwiązanie dokładne' },
    description: {
      en: 'b lies in Col(A), so residual is zero.',
      pl: 'b leży w Col(A), więc residuum jest zerowe.',
    },
    samples: [
      [-3, -3.5],
      [-1, -0.5],
      [1, 2.5],
      [3, 5.5],
    ],
  },
  {
    id: 'near-exact',
    label: { en: 'Nearly exact', pl: 'Prawie dokładne' },
    description: {
      en: 'b is close to Col(A), so residual is small.',
      pl: 'b jest blisko Col(A), więc residuum jest małe.',
    },
    samples: [
      [-3, -3.4],
      [-1, -0.65],
      [1, 2.55],
      [3, 5.45],
    ],
  },
  {
    id: 'orthogonal-columns-like',
    label: { en: 'Orthogonal columns', pl: 'Kolumny ortogonalne' },
    description: {
      en: 'Balanced x-distribution stabilizes fit and interpretation.',
      pl: 'Zbalansowany rozkład x stabilizuje dopasowanie i interpretację.',
    },
    samples: [
      [-4, -2.2],
      [-2, -0.8],
      [2, 2.0],
      [4, 3.4],
    ],
  },
  {
    id: 'nearly-dependent-columns',
    label: { en: 'Nearly dependent columns', pl: 'Kolumny prawie zależne' },
    description: {
      en: 'Columns are close to dependent, so the problem is ill-conditioned.',
      pl: 'Kolumny są bliskie zależności, więc problem jest źle uwarunkowany.',
    },
    samples: [
      [0.95, 1.1],
      [1.02, 1.32],
      [1.08, 1.48],
      [1.16, 1.71],
    ],
  },
]

export function getLeastSquaresUIText(language: AppLanguage) {
  if (language === 'pl') {
    return {
      controls: 'Sterowanie i presety',
      algebra: 'Widok algebraiczny',
      samples: 'Punkty danych (x, y)',
      showResidual: 'Pokaż residuum',
      showProjection: 'Pokaż rzut',
      showColumns: 'Pokaż Col(A) (koncepcyjnie)',
      dragHint: 'Przeciągaj punkty lub edytuj x,y, aby obserwować zmianę linii regresji.',
      status: 'Moduł interaktywny',
      sceneLabel: 'Scena regresji liniowej least squares',
      resetView: 'Reset widoku',
      resetPreset: 'Reset danych',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    samples: 'Data points (x, y)',
    showResidual: 'Show residual',
    showProjection: 'Show projection',
    showColumns: 'Show Col(A) (conceptual)',
    dragHint: 'Drag points or edit x,y values to see the regression line update.',
    status: 'Interactive module',
    sceneLabel: 'Least squares linear regression scene',
    resetView: 'Reset view',
    resetPreset: 'Reset data',
  }
}

export function getLeastSquaresTheory(language: AppLanguage): string[] {
  if (language === 'pl') {
    return [
      'Dla A ∈ R⁴ˣ² układ Ax = b jest zwykle nadokreślony i bez rozwiązania dokładnego.',
      'Wszystkie wektory Ax leżą w przestrzeni kolumn Col(A).',
      'Least squares minimalizuje:',
      '||Ax - b||².',
      'Aᵀ oznacza transpozycję macierzy A (zamianę wierszy z kolumnami).',
      'Warunek ortogonalności residuum:',
      'Aᵀ(b - Ax*) = 0.',
      'Równanie normalne:',
      'AᵀAx* = Aᵀb.',
      'Wektor b̂ = Ax* jest rzutem ortogonalnym b na Col(A).',
    ]
  }

  return [
    'For A ∈ R⁴ˣ², Ax = b is usually overdetermined with no exact solution.',
    'All vectors Ax lie in the column space Col(A).',
    'Least squares minimizes:',
    '||Ax - b||².',
    'Aᵀ is the transpose of matrix A (rows and columns swapped).',
    'Residual orthogonality condition:',
    'Aᵀ(b - Ax*) = 0.',
    'Normal equation:',
    'AᵀAx* = Aᵀb.',
    'Vector b̂ = Ax* is the orthogonal projection of b onto Col(A).',
  ]
}

export function getLeastSquaresWhatToNotice(
  language: AppLanguage,
  residualNorm: number,
  isExact: boolean,
): string {
  if (language === 'pl') {
    if (isExact) {
      return 'b leży w Col(A): r = b - Ax* = 0 i rozwiązanie jest dokładne.'
    }
    if (residualNorm < 0.15) {
      return 'b jest blisko Col(A), więc residuum jest małe.'
    }
    return 'b jest poza Col(A): least squares wybiera najbliższy osiągalny punkt Ax*.'
  }

  if (isExact) {
    return 'b lies in Col(A): r = b - Ax* = 0 and the solution is exact.'
  }
  if (residualNorm < 0.15) {
    return 'b is close to Col(A), so residual stays small.'
  }
  return 'b is outside Col(A): least squares picks the closest reachable point Ax*.'
}
