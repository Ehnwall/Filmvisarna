import bookingsService from '../service/bookingsService.js'
import validator from '../utils/validator.js'

const getAllBookings = (req, res) => {
    const { email, role } = req.user
    try {
        const bookings = bookingsService.getBookings(email, role)
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

const getAllTickets = (req, res) => {
    try {
        const ticket = bookingsService.getAllTickets()
        res.status(200).json(ticket)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getBookingsFromNumber = (req, res) => {
    const { bookingNr } = req.params
    try {
        const specifikBooking = bookingsService.getBookingFs(bookingNr)
        res.status(200).send(specifikBooking)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}
const getBookingsFromEmail = (req, res) => {
    const { userEmail } = req.params
    try {
        const specifikBooking = bookingsService.getBookingFromEmail(userEmail)
        res.status(200).send(specifikBooking)
    } catch (error) {
        res.status(404).send({ msg: error.message })
    }
}

const createBooking = (req, res) => {
    const { showId, seats } = req.body

    try {
        if (!showId || !seats) {
            throw new Error('ShowId and seats are required')
        }
        if (req.body.user) {
            validator.signupGuest(req.body.user)
            req.user.email = req.body.user.email
            req.user.firstName = req.body.user.firstName
            req.user.lastName = req.body.user.lastName
        }
        const newBooking = bookingsService.createBooking(showId, seats, req.user)
        return res.status(200).send({ msg: 'Booking successfully created', bookingNr: newBooking })
    } catch (e) {
        return res.status(400).send({ msg: e.message })
    }
}

const deleteBooking = (req, res) => {
    const bookingId = req.params.id

    const { email, role } = req.user

    try {
        const result = bookingsService.deleteBookingById(bookingId, email, role)
        res.status(200).json({ msg: 'Booking deleted successfully', result })
    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: error.message })
    }
}

export default {
    getBookingsFromNumber,
    getBookingsFromEmail,
    getAllTickets,
    getAllBookings,
    createBooking,
    deleteBooking,
}
