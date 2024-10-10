import express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = express.Router()

router.get('/api/bookings', bookingsController.getAllBookings)
router.get('/api/tickets', bookingsController.getAllTickets)
router.get('/api/bookings/:bookingId', bookingsController.getBookingsFromId)

export default router
