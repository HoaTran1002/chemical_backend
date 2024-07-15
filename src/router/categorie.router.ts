import { Router } from 'express'
import CategorieCotroller from '../modules/categorieModule/categorie.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import { ICategorie } from '~/modules/categorieModule/categorie.interface'
import { validator } from '~/middleware/validate.middleware'
import { categorieUpdateValidate, categorieValidate, checkCategorieId } from '~/validator/categorie.validator'
import roleMiddleware from '~/middleware/role.middleware'
import authMiddleware from '~/middleware/auth.middleware'

const router = Router()

router.post(
  '/create',
  validator<ICategorie>(categorieValidate),
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(CategorieCotroller.createCategory)
)
router.get(
  '/get',
  validator(checkCategorieId),
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(CategorieCotroller.getCategoryById)
)
router.get(
  '/getAll',
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(CategorieCotroller.getAllCategories)
)
router.patch(
  '/update',
  validator<ICategorie>(categorieUpdateValidate),
  validator(checkCategorieId),
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(CategorieCotroller.updateCategory)
)
router.delete(
  '/delete',
  validator(checkCategorieId),
  authMiddleware,
  roleMiddleware(['admin']),
  errAsyncHandlerMiddleware(CategorieCotroller.deleteCategory)
)

export default router
