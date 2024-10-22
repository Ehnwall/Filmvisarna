export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: string
    description: Description
    trailerUrl: string
    posterUrl: string
}
type Description = {
    director: string
    cast: string[]
    synopsis: string
    genre: string[]
    speech: string[]
    language: string[]
    year: number
}
