import express from 'express'
import moviesController from '../controller/moviesController.js'

const router = express.Router()

router.get('/api/movies', moviesController.getAllMovies)
router.get('/api/movies/:id', moviesController.getOneMovie)
router.get('/api/movies/:id/shows', moviesController.getShowByMovieID)

export default router
