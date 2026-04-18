import type { AppLanguage } from '../app/AppPreferencesContext'
import type { Matrix2x2, Vector2 } from '../math'

export type EigenLambdaMode = 'bestFit' | 'manual'

export type EigenPreset = {
  id: string
  label: Record<AppLanguage, string>
  description: Record<AppLanguage, string>
  matrix: Matrix2x2
  candidateVector: Vector2
  lambda: number
  lambdaMode: EigenLambdaMode
}

export const eigenPresets: readonly EigenPreset[] = [
  {
    id: 'distinct-real',
    label: { en: 'Distinct real', pl: 'Rozne rzeczywiste' },
    description: {
      en: 'Diagonal matrix with two different real eigenvalues.',
      pl: 'Macierz diagonalna z dwiema roznymi wartosciami wlasnymi.',
    },
    matrix: [
      [2, 0],
      [0, -1],
    ],
    candidateVector: [1, 0],
    lambda: 2,
    lambdaMode: 'bestFit',
  },
  {
    id: 'repeated',
    label: { en: 'Repeated eigenvalue', pl: 'Powtorzona wartosc' },
    description: {
      en: 'Identity has the same eigenvalue in every direction.',
      pl: 'Identycznosc ma te sama wartosc wlasna w kazdym kierunku.',
    },
    matrix: [
      [1, 0],
      [0, 1],
    ],
    candidateVector: [1.6, 1.2],
    lambda: 1,
    lambdaMode: 'bestFit',
  },
  {
    id: 'zero-eigenvalue',
    label: { en: 'Zero eigenvalue', pl: 'Zero jako wartosc' },
    description: {
      en: 'One direction collapses to zero under the transformation.',
      pl: 'Jeden kierunek zapada sie do zera pod transformacja.',
    },
    matrix: [
      [0, 0],
      [0, 2],
    ],
    candidateVector: [1.8, 0],
    lambda: 0,
    lambdaMode: 'bestFit',
  },
  {
    id: 'negative-eigenvalue',
    label: { en: 'Negative eigenvalue', pl: 'Ujemna wartosc' },
    description: {
      en: 'Negative eigenvalue keeps line but flips vector direction.',
      pl: 'Ujemna wartosc zachowuje prosta, ale odwraca zwrot wektora.',
    },
    matrix: [
      [-2, 0],
      [0, 1],
    ],
    candidateVector: [1.4, 0],
    lambda: -2,
    lambdaMode: 'bestFit',
  },
  {
    id: 'rotation-no-real',
    label: { en: 'Rotation (no real)', pl: 'Rotacja (brak rzeczywistych)' },
    description: {
      en: 'Pure 90-degree rotation has no real eigenvectors in 2D.',
      pl: 'Czysta rotacja o 90 stopni nie ma rzeczywistych wektorow wlasnych w 2D.',
    },
    matrix: [
      [0, -1],
      [1, 0],
    ],
    candidateVector: [2, 0],
    lambda: 0,
    lambdaMode: 'manual',
  },
  {
    id: 'defective',
    label: { en: 'Non-diagonalizable', pl: 'Niediagonalizowalna' },
    description: {
      en: 'Jordan block has repeated eigenvalue but one eigen-direction.',
      pl: 'Blok Jordana ma powtorzona wartosc, ale tylko jeden kierunek wlasny.',
    },
    matrix: [
      [2, 1],
      [0, 2],
    ],
    candidateVector: [1.6, 0],
    lambda: 2,
    lambdaMode: 'bestFit',
  },
]

export function getEigenUIText(language: AppLanguage) {
  const L = '\u03BB'
  const D = '\u0394'

  if (language === 'pl') {
    return {
      controls: 'Sterowanie i presety',
      algebra: 'Widok algebraiczny',
      matrixA: 'Macierz A',
      candidateVector: 'Wektor kandydat v',
      lambdaSection: `Wartosc ${L}`,
      lambdaMode: `Tryb ${L}`,
      lambdaBestFit: 'Dopasowana',
      lambdaManual: 'Reczna',
      bestFitLambda: `Najlepsza ${L} (Rayleigh)`,
      manualLambda: `Reczna ${L}`,
      copyBestFit: 'Uzyj dopasowanej',
      overlays: 'Nakladki',
      showCandidate: 'Pokaz v',
      showTransformed: 'Pokaz A v',
      showScaled: `Pokaz ${L} v`,
      showDifference: `Pokaz roznice A v - ${L} v`,
      showDirectionScan: 'Pokaz skan kierunkow (przyblizenie)',
      dragHint: `Przeciagaj koniec wektora v i obserwuj, kiedy A v pokrywa sie z ${L} v.`,
      scanHint:
        'Skan kierunkow jest numerycznym przyblizeniem: zielone promienie sugeruja male residuum r.',
      noRealEigenHint: `Ta macierz nie ma rzeczywistych wektorow wlasnych w 2D (${D} < 0).`,
      residual: 'Residuum',
      residualExact: 'Idealna para wlasna',
      residualAligned: 'Prawie idealna para wlasna',
      residualClose: 'Blisko kierunku wlasnego',
      residualOff: 'Poza kierunkiem wlasnym',
      realEigenvectors: 'Rzeczywiste wektory wlasne',
      yes: 'tak',
      no: 'nie',
      status: 'Modul interaktywny',
      sceneLabel: 'Scena wektorow wlasnych 2D',
      resetView: 'Reset widoku',
    }
  }

  return {
    controls: 'Controls and Presets',
    algebra: 'Algebra View',
    matrixA: 'Matrix A',
    candidateVector: 'Candidate vector v',
    lambdaSection: `${L} value`,
    lambdaMode: `${L} mode`,
    lambdaBestFit: 'Best-fit',
    lambdaManual: 'Manual',
    bestFitLambda: `Best ${L} (Rayleigh)`,
    manualLambda: `Manual ${L}`,
    copyBestFit: 'Use best-fit',
    overlays: 'Overlays',
    showCandidate: 'Show v',
    showTransformed: 'Show A v',
    showScaled: `Show ${L} v`,
    showDifference: `Show difference A v - ${L} v`,
    showDirectionScan: 'Show direction scan (approximate)',
    dragHint: `Drag vector v and watch when A v aligns with ${L} v.`,
    scanHint: 'Direction scan is numerical approximation: green rays suggest small residual r.',
    noRealEigenHint: `This matrix has no real eigenvectors in 2D (${D} < 0).`,
    residual: 'Residual',
    residualExact: 'Exact eigenpair',
    residualAligned: 'Near exact eigenpair',
    residualClose: 'Close to eigen-direction',
    residualOff: 'Away from eigen-direction',
    realEigenvectors: 'Real eigenvectors',
    yes: 'yes',
    no: 'no',
    status: 'Interactive module',
    sceneLabel: 'Eigenvectors 2D scene',
    resetView: 'Reset view',
  }
}

export function getEigenTheory(language: AppLanguage): string[] {
  const L = '\u03BB'
  const D = '\u0394'
  const squared = '\u00B2'

  if (language === 'pl') {
    return [
      'Wektor własny zachowuje kierunek:',
      `A v = ${L} v.`,
      `${L} to skala (i ewentualne odwrócenie znaku), a residuum mierzy błąd dopasowania:`,
      `||A v - ${L} v||.`,
      'Dla macierzy 2x2 znak dyskryminantu wskazuje, czy istnieją rzeczywiste wartości własne:',
      `${D} = tr(A)${squared} - 4det(A).`,
      'Rotacja 2D bez skalowania nie ma rzeczywistych wektorów własnych: każdy wektor zmienia kierunek.',
    ]
  }

  return [
    'An eigenvector preserves direction:',
    `A v = ${L} v.`,
    `${L} is the scaling factor (and possible sign flip), while residual measures mismatch:`,
    `||A v - ${L} v||.`,
    'For 2x2 matrices, discriminant indicates whether real eigenvalues exist:',
    `${D} = tr(A)${squared} - 4det(A).`,
    'Pure 2D rotation has no real eigenvectors: every non-zero vector changes direction.',
  ]
}

export function getEigenWhatToNotice(
  language: AppLanguage,
  residualState: 'exact' | 'aligned' | 'close' | 'off',
  hasRealEigenvectors: boolean,
): string {
  const L = '\u03BB'

  if (language === 'pl') {
    if (!hasRealEigenvectors) {
      return `Tutaj brak rzeczywistych kierunkow wlasnych: A v i ${L} v nie pokryja sie dla zadnego niezerowego v.`
    }
    if (residualState === 'exact') {
      return `A v pokrywa sie idealnie z ${L} v, wiec masz dokladna pare wlasna.`
    }
    if (residualState === 'aligned') {
      return `A v prawie pokrywa sie z ${L} v, wiec wybrales kierunek bardzo bliski wektorowi wlasnemu.`
    }
    if (residualState === 'close') {
      return `Kierunek jest blisko, ale jeszcze nie idealny - sproboj skorygowac v lub ${L}.`
    }
    return 'Wiekszosc kierunkow nie jest wlasna: po transformacji A wektor zmienia kierunek.'
  }

  if (!hasRealEigenvectors) {
    return `No real invariant direction here: A v and ${L} v cannot fully align for any non-zero real v.`
  }
  if (residualState === 'exact') {
    return `A v matches ${L} v exactly, so this is an exact eigenpair.`
  }
  if (residualState === 'aligned') {
    return `A v nearly overlaps with ${L} v, so this direction is very close to an eigenvector.`
  }
  if (residualState === 'close') {
    return `Direction is close, but not exact yet - adjust v or ${L} to reduce mismatch.`
  }
  return 'Most directions are not eigen-directions: matrix A changes direction after transformation.'
}
