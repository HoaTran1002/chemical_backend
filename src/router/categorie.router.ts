import { Router } from 'express'
import CategorieCotroller from '../modules/categorieModule/categorie.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import { ICategorie } from '~/modules/categorieModule/categorie.interface'
import { validator } from '~/middleware/validate.middleware'
import { categorieValidate } from '~/validator/categorie.validator'

const router = Router()

router.post(
  '/create',
  validator<ICategorie>(categorieValidate),
  errAsyncHandlerMiddleware(CategorieCotroller.createCategorie)
)
router.get('/get/:id', CategorieCotroller.getByIdCategorie)
router.get('/getAll', CategorieCotroller.getAllCategorie)
router.patch('/update/:id', CategorieCotroller.updateCategorie)
router.delete('/delete/:id', CategorieCotroller.removeCategorie)

export default router
