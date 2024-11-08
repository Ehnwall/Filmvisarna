import express from 'express'
import authFilter from '../middleware/jwtfilter.js'
import moviesController from '../controller/moviesController.js'

const router = express.Router()

router.get('/api/movies', moviesController.getAllMovies)
router.get('/api/movies/:id', moviesController.getOneMovie)

//Get hows by movie id
router.get('/api/movies/:id/shows', moviesController.getShowByMovieId)
router.post('/api/movies', authFilter.authourize(['admin']), moviesController.addMovie)

export default router
