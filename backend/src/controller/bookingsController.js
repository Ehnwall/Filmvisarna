import { deleteBookingById } from '../service/bookingsService.js'

export const deleteBooking = (req, res) => {
    const bookingId = req.params.id

    try {
        const result = deleteBookingById(bookingId)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking' })
    }
}
