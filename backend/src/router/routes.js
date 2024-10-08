import express from 'express'
import controller from '../controller/controller'

const router = express.Router()

router.get('/api/movies', controller.getAllMovies)

export default router
