import express from 'express'
const router = express.Router()

import { RegisterUser, LoginUser, GetProfile } from '../controllers/UserController.js'
import { auth } from '../middlewares/authMiddleware.js'

router.post('/user/register', RegisterUser)

router.post('/user/login', LoginUser)

router.get('/user/profile', auth, GetProfile)

export default router;