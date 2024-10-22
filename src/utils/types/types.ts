export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: number
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
export type TICKETS = {
    Id: number
    ticketType: string
    price: number
}
