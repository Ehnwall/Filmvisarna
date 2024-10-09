import Express from 'express'
import showsController from '../controller/showsController.js'

const router = Express.Router()

router.get('/api/showsbyId/:id', showsController.getShowById)

export default router
