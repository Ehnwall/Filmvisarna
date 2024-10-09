import express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = express.Router()

router.get('/api/bookings/:Id', bookingsController.getBookings)

export default router
