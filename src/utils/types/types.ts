export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: string
    description: Description
    trailerUrl: string
    posterUrl: string
}

export type SEAT = {
    seatRow: number
    seatNumber: number
    ticketType: string
    ticketPrice: number
}

export type USERBOOKING = {
    bookingId: number
    bookingNumberId: string
    userId: number
    userEmail: string
    userFirstname: string
    userLastname: string
    showTime: string
    cinemaName: string
    movieTitle: string
    movieUrl: string
    seats: SEAT[]
}

export type CONFIRMDELETEMODALPROPS = {
    show: boolean
    onHide: () => void
    onConfirm: () => void
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
export type TICKETAMOUNT = {
    ticketId: number
    amount: number
}

export type CINEMASEATS = {
    Id: number
    cinemaId: number
    seatRow: number
    seatNumber: number
}

export type SHOWSONMOVIE = {
    showId: number
    movieId: number
    showTime: string
    cinemaName: string
    cinemaId: number
}

export type BOOKING = {
    showId: number
    seats: SELECTEDSEATS[]
}
export type BOOKINGRESP = {
    msg: string
    bookingId: number
}

export type SELECTEDSEATS = {
    seatId: number
    ticketType: number
}
