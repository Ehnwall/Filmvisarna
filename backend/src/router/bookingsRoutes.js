import express from 'express'
import bookingsController from '../controller/bookingsController.js'
import authFilter from '../middleware/jwtfilter.js'

const router = express.Router()

router.get('/api/bookings', authFilter.authourize(['user', 'admin']), bookingsController.getAllBookings)
router.get('/api/tickets', bookingsController.getAllTickets)
router.get('/api/bookings/:bookingNr', bookingsController.getBookingsFromNumber)
router.post('/api/bookings', authFilter.authourize(['guest', 'user', 'admin']), bookingsController.createBooking)
router.delete('/api/bookings/:id', authFilter.authourize(['user', 'admin']), bookingsController.deleteBooking)

export default router
