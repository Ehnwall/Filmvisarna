import express from 'express'
import cinemasController from '../controller/cinemasController.js'

const router = express.Router()

router.get('/api/cinemas/:id/seats', cinemasController.getSeatsByCinemaId)

export default router
