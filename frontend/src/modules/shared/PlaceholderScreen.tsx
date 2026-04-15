type PlaceholderScreenProps = {
  heading: string
  description: string
}

export function PlaceholderScreen({ heading, description }: PlaceholderScreenProps) {
  return (
    <article className="placeholder-screen">
      <h2>{heading}</h2>
      <p>{description}</p>
    </article>
  )
}
