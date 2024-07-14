import { Router } from 'express'
import userController from '~/modules/userModule/user.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import authMiddleware from '~/middleware/auth.middleware'
import { validator } from '~/middleware/validate.middleware'
import { registerValidate, loginValidate, refreshTokenValidate } from '~/validator/auth.validator'
import { IUser } from '~/modules/userModule/user.interface'
import roleMiddleware from '~/middleware/role.middleware'
const router = Router()

router.post('/register', validator<IUser>(registerValidate), errAsyncHandlerMiddleware(userController.register))
router.post('/login', validator<IUser>(loginValidate), errAsyncHandlerMiddleware(userController.logIn))
router.post('/logout', authMiddleware, errAsyncHandlerMiddleware(userController.logout))
router.post('/refresh-token', validator(refreshTokenValidate), errAsyncHandlerMiddleware(userController.refreshToken))

router.post(
  '/users',
  authMiddleware,
  roleMiddleware(['admin']),
  validator(registerValidate),
  errAsyncHandlerMiddleware(userController.createUser)
)

router.put(
  '/users',
  authMiddleware,
  roleMiddleware(['admin']),
  validator(registerValidate),
  errAsyncHandlerMiddleware(userController.updateUser)
)

router.delete('/users', authMiddleware, roleMiddleware(['admin']), errAsyncHandlerMiddleware(userController.deleteUser))

router.get('/users', authMiddleware, roleMiddleware(['admin']), errAsyncHandlerMiddleware(userController.getAllUsers))

router.get(
  '/users/id',
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(userController.getUserById)
)
export default router
