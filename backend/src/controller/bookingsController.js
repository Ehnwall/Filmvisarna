import bookingsService from '../service/bookingsService.js'

const getBookingsFromId = (req, res) => {
    const { bookingId } = req.params
    const specifikBooking = bookingsService.getBookingFs(bookingId)

    if (!specifikBooking) {
        return res.status(204).send({ msg: 'No booking found' })
    }

    res.status(200).send(specifikBooking)
}

export default { getBookingsFromId }
