import express from 'express'
import moviesController from '../controller/moviesController.js'

const router = express.Router()

router.get('/api/movies', moviesController.getAllMovies)

export default router
