import express from 'express'
import bookingsController from '../controller/bookingsController.js'
import authFilter from '../middleware/jwtfilter.js'

const router = express.Router()

router.get('/api/bookings', authFilter.authourize(), bookingsController.getAllBookings)
router.get('/api/tickets', bookingsController.getAllTickets)

export default router
