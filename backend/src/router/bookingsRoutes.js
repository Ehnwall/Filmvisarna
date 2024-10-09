import express from 'express'
import bookingsController from '../controller/bookingsController.js'

const bookingRouter = express.Router()

bookingRouter.get('/api/bookings/:bookingId', bookingsController.getBookingsFromId)

export default bookingRouter
