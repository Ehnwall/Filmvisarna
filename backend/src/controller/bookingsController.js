import { getBookings } from '../service/bookingsService.js'

export const getAllBookings = async (req, res) => {
    try {
        const { email, role } = req.user
        const bookings = await getBookings(email, role)

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
