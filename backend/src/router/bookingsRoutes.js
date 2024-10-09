import Express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = Express.Router()

router.get('/api/bookingbyId/:id', bookingsController.getShowById)

export default router
