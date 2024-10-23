export type MOVIE = {
    id: number
    title: string
    durationMin: number
    ageLimit: number
    description: object
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
