import express from 'express'
import { getUserBookings } from '../controller/bookingsController.js'

const router = express.Router()

router.get('/api/bookings/:userId', getUserBookings)

export default router
