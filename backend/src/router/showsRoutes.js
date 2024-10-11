import express from 'express'
import showsController from '../controller/showsController.js'

const router = express.Router()

router.get('/api/shows', showsController.getAllShowsController)
router.get('/api/occupiedSeats/:Id', showsController.getSeats)

export default router
