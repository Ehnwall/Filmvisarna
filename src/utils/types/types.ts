export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: number
    description: object
    trailerUrl: string
    posterUrl: string
}

export type SHOWS = {
    showId: number
    showTime: string
    posterURL: string
    genre: string[]
    duration: number
    agelimit: number
    movieTitle: string
    cinemaName: string
    cinemaId: number
}
