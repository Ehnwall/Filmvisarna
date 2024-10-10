import express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = express.Router()

router.get('/api/bookings', bookingsController.getAllBookings)

export default router
