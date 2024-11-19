import Express from 'express'
import showsController from '../controller/showsController.js'
import jwtfilter from '../middleware/jwtfilter.js'

const router = Express.Router()

router.get('/api/shows/:id', showsController.getShowById)
router.get('/api/shows', showsController.getAllShowsController)
router.get('/api/occupiedSeats/:Id', showsController.getSeats)
router.post('/api/shows', jwtfilter.authourize(['admin']), showsController.postOneShowController)

export default router
