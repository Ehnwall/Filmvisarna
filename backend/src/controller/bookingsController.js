import { getBookingsByUserId } from '../service/bookingsService.js'

export const getUserBookings = async (req, res) => {
    const { userId } = req.params

    try {
        const bookings = await getBookingsByUserId(userId)

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
