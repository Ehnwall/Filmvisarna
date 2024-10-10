import bookingsService from '../service/bookingsService.js'

const getAllBookings = (req, res) => {
    try {
        const { email, role } = req.user
        const bookings = bookingsService.getBookings(email, role)

        if (bookings.length > 0) {
            res.status(200).json(bookings)
        } else {
            res.status(404).json({ msg: 'No bookings found for this user' })
        }
    } catch (error) {
        console.error('Error fetching bookings:', error)
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

export default { getAllTickets, getAllBookings }
