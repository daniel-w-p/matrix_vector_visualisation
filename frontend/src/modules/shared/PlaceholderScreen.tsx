import type { ReactNode } from 'react'

type PlaceholderScreenProps = {
  heading: string
  description: string
  children?: ReactNode
}

export function PlaceholderScreen({ heading, description, children }: PlaceholderScreenProps) {
  return (
    <article className="placeholder-screen">
      <h2>{heading}</h2>
      <p>{description}</p>
      {children}
    </article>
  )
}
