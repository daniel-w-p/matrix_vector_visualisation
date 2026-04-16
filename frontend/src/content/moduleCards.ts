import type { AppLanguage } from '../app/AppPreferencesContext'

export type ModuleKey =
  | 'vector2d'
  | 'dotProduct'
  | 'matrix2d'
  | 'crossProduct3d'
  | 'matrix3d'
  | 'eigen'

export type LocalizedText = {
  en: string
  pl: string
}

export type ModuleCard = {
  id: ModuleKey
  shortLabel: LocalizedText
  title: LocalizedText
  description: LocalizedText
  defaultWhatToNotice: LocalizedText
  defaultTheory: LocalizedText[]
  defaultStatus: LocalizedText
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
    shortLabel: { en: 'Vector 2D', pl: 'Wektor 2D' },
    title: { en: 'Vector 2D', pl: 'Wektor 2D' },
    description: {
      en: 'Vector addition, subtraction, and scaling with direct manipulation.',
      pl: 'Dodawanie, odejmowanie i skalowanie wektorów przez bezpośrednią manipulację.',
    },
    defaultWhatToNotice: {
      en: 'Watch how the result vector changes when you drag endpoints or switch operation.',
      pl: 'Obserwuj, jak zmienia się wektor wynikowy przy przeciąganiu punktów i zmianie operacji.',
    },
    defaultTheory: [
      {
        en: 'For vectors in coordinates, addition and subtraction are done element by element.',
        pl: 'Dla wektorów w postaci współrzędnych, dodawanie i odejmowanie wykonuje się element po elemencie.',
      },
      {
        en: 'Scalar multiplication multiplies each vector component by the same scalar.',
        pl: 'Mnożenie przez skalar polega na przemnożeniu każdej składowej przez ten sam skalar.',
      },
    ],
    defaultStatus: {
      en: 'Interactive module',
      pl: 'Moduł interaktywny',
    },
  },
  dotProduct: {
    id: 'dotProduct',
    shortLabel: { en: 'Dot Product', pl: 'Iloczyn skalarny' },
    title: { en: 'Dot Product', pl: 'Iloczyn skalarny' },
    description: {
      en: 'Projection and angle-alignment intuition between two vectors.',
      pl: 'Intuicja rzutu i zgodności kierunku między dwoma wektorami.',
    },
    defaultWhatToNotice: {
      en: 'The sign changes as the angle crosses 90 degrees.',
      pl: 'Znak wyniku zmienia się, gdy kąt przekracza 90 stopni.',
    },
    defaultTheory: [
      {
        en: 'Dot product in 2D: a·b = a1b1 + a2b2.',
        pl: 'Iloczyn skalarny w 2D: a·b = a1b1 + a2b2.',
      },
      {
        en: 'Equivalent form: a·b = |a||b|cos(theta), linking algebra and geometry.',
        pl: 'Postać równoważna: a·b = |a||b|cos(theta), łącząca algebrę i geometrię.',
      },
    ],
    defaultStatus: { en: 'Placeholder screen', pl: 'Ekran placeholdera' },
  },
  matrix2d: {
    id: 'matrix2d',
    shortLabel: { en: 'Matrix 2D', pl: 'Macierz 2D' },
    title: { en: 'Matrix 2D', pl: 'Macierz 2D' },
    description: {
      en: '2D matrix transformations and determinant as area scaling.',
      pl: 'Transformacje macierzowe 2D i wyznacznik jako skala pola.',
    },
    defaultWhatToNotice: {
      en: 'Columns of a matrix describe images of basis vectors.',
      pl: 'Kolumny macierzy opisują obrazy wektorów bazowych.',
    },
    defaultTheory: [
      {
        en: 'Matrix-vector multiplication combines matrix columns weighted by vector components.',
        pl: 'Mnożenie macierzy przez wektor łączy kolumny macierzy ważone składowymi wektora.',
      },
      {
        en: 'For 2x2 matrices, determinant gives signed area scale.',
        pl: 'Dla macierzy 2x2 wyznacznik opisuje skalę pola z orientacją.',
      },
    ],
    defaultStatus: { en: 'Placeholder screen', pl: 'Ekran placeholdera' },
  },
  crossProduct3d: {
    id: 'crossProduct3d',
    shortLabel: { en: 'Cross 3D', pl: 'Iloczyn wektorowy 3D' },
    title: { en: 'Cross Product 3D', pl: 'Iloczyn wektorowy 3D' },
    description: {
      en: 'Perpendicular direction and oriented area in three dimensions.',
      pl: 'Kierunek prostopadły i zorientowane pole w trzech wymiarach.',
    },
    defaultWhatToNotice: {
      en: 'Swapping vector order flips the result direction.',
      pl: 'Zmiana kolejności wektorów odwraca kierunek wyniku.',
    },
    defaultTheory: [
      {
        en: '|a x b| = |a||b|sin(theta), giving parallelogram area.',
        pl: '|a x b| = |a||b|sin(theta), czyli pole równoległoboku.',
      },
      {
        en: 'Direction is perpendicular to both vectors by right-hand rule.',
        pl: 'Kierunek wyniku jest prostopadły do obu wektorów zgodnie z regułą prawej dłoni.',
      },
    ],
    defaultStatus: { en: 'Placeholder screen', pl: 'Ekran placeholdera' },
  },
  matrix3d: {
    id: 'matrix3d',
    shortLabel: { en: 'Matrix 3D', pl: 'Macierz 3D' },
    title: { en: 'Matrix 3D', pl: 'Macierz 3D' },
    description: {
      en: '3D transformations and determinant as volume scaling.',
      pl: 'Transformacje 3D i wyznacznik jako skala objętości.',
    },
    defaultWhatToNotice: {
      en: 'The transformed basis explains the whole transformation.',
      pl: 'Przekształcona baza wyjaśnia całą transformację.',
    },
    defaultTheory: [
      {
        en: 'A 3x3 matrix maps basis vectors to new directions and lengths.',
        pl: 'Macierz 3x3 mapuje wektory bazowe na nowe kierunki i długości.',
      },
      {
        en: 'Determinant measures signed volume scaling.',
        pl: 'Wyznacznik mierzy skalowanie objętości z orientacją.',
      },
    ],
    defaultStatus: { en: 'Placeholder screen', pl: 'Ekran placeholdera' },
  },
  eigen: {
    id: 'eigen',
    shortLabel: { en: 'Eigen', pl: 'Wartości własne' },
    title: { en: 'Eigen Concepts', pl: 'Pojęcia własne' },
    description: {
      en: 'Directions preserved by transformation and live Av = lambda v checks.',
      pl: 'Kierunki zachowane przez transformację oraz weryfikacja Av = lambda v.',
    },
    defaultWhatToNotice: {
      en: 'Eigenvectors preserve direction under transformation.',
      pl: 'Wektory własne zachowują kierunek pod działaniem transformacji.',
    },
    defaultTheory: [
      {
        en: 'Eigen relation: Av = lambda v.',
        pl: 'Relacja własna: Av = lambda v.',
      },
      {
        en: 'Residual Av - lambda v should approach zero for a true eigenpair.',
        pl: 'Reszta Av - lambda v powinna dążyć do zera dla poprawnej pary własnej.',
      },
    ],
    defaultStatus: { en: 'Placeholder screen', pl: 'Ekran placeholdera' },
  },
}

export function getLocalizedText(text: LocalizedText, language: AppLanguage): string {
  return text[language]
}
