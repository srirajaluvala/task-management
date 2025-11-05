import { Router } from 'express'
import { UserController } from '../controllers/UserController'

const router = Router()
const userController = new UserController()

router.post('/users', userController.register.bind(userController))
router.get('/users', userController.getAll.bind(userController))

export default router