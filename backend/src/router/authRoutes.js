import express from 'express'
import authController from '../controller/authController.js'

const router = express.Router()

router.post('/api/register', authController.register)

export default router
