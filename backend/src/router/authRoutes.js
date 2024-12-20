import express from 'express'
import authController from '../controller/authController.js'

const router = express.Router()

router.post('/api/signup', authController.signup)
router.post('/api/login', authController.login)

export default router
