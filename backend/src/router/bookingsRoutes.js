import express from 'express'
import bookingsController from '../controller/bookingsController.js'
import authFilter from '../middleware/jwtfilter.js'

const router = express.Router()

router.get('/api/bookings', bookingsController.getAllBookings)
router.get('/api/tickets', authFilter.authourize(), bookingsController.getAllTickets)

export default router
