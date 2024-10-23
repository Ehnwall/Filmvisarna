export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: number
    description: object
    trailerUrl: string
    posterUrl: string
}
export type SIGNIN = {
    email: string
    password: string
}
export type SIGNINRESPONSE = {
    bearer: string
    firstName: string
    lastName: string
}