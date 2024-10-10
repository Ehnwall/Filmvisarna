import express from 'express'
import { getAllBookings } from '../controller/bookingsController.js'

const router = express.Router()

router.get('/api/bookings', getAllBookings)

export default router
