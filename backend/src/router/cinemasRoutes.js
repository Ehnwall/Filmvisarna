import express from 'express'
import getSeatsController from '../controller/cinemasController.js'

const router = express.Router()

router.get('/api/shows/:Id', getSeatsController)

export default router
