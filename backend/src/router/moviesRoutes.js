import express from 'express'
import moviesController from '../controller/moviesController.js'

const router = express.Router()

router.get('/api/movies', moviesController.getAllMovies)
router.get('/api/movies/:id', moviesController.getOneMovie)

//Get hows by movie id
router.get('/api/movies/:id/shows', moviesController.getShowByMovieId)

export default router
