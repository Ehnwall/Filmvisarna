import express from 'express'
import { deleteBooking } from '../controller/bookingsController.js'

const router = express.Router()

router.delete('/api/bookings/:id', deleteBooking)

export default router
