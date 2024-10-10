import Express from 'express'
import bookingsController from '../controller/bookingsController.js'

const router = Express.Router()

router.get('/api/tickets', bookingsController.getAllTickets)

export default router