import Express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = Express.Router()

router.get('/api/ticketsById/:id', bookingsController.getTicketsById)

export default router
