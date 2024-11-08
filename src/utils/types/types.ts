export type MOVIE = {
    Id: number
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

export type CONFIRMMODALPROPS = {
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
    role: string
}
export type SIGNUP = {
    firstName: string
    lastName: string
    email: string
    password: string
}
export type SIGNUPRESPONSE = {
    changes: string
    lastInsertRowid: string
}
export type Description = {
    director: string
    cast: string[]
    synopsis: string
    genre: string[]
    text: string
    language: string
    originalTitle: string
    year: number
}
export type SHOWS = {
    showId: number
    showTime: string
    posterURL: string
    genre: string[]
    duration: number
    ageLimit: number
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
export type OCCUPIEDSEATS = {
    occupiedSeats: number[]
}
export interface BOOKING {
    showId: number
    seats: SELECTEDSEATS[]
    user: USER
}

export type PARTIALBOOKING = Partial<BOOKING>

export type BOOKINGRESP = {
    msg: string
    bookingId: number
}

export type SELECTEDSEATS = {
    seatId: number
    ticketType: number
}

export type USER = {
    email: string
    firstName: string
    lastName: string
}

export type NEWMOVIE = {
    title: string
    ageLimit: number
    durationMin: number
    description: DescriptionNewMovie
    posterUrl: string
    trailerUrl: string
}

export type POSTMOVIERESP = {
    msg: string
    movieTitle: string
    movieId: number
}

export type MOVIEERROR = {
    msg: string
}

export type DescriptionNewMovie = {
    director: string[]
    originalTitle: string
    genre: string[]
    cast: string[]
    year: string
    text: string
    language: string
    synopsis: string
}
