import { Router } from 'express'
import ProductCotroller from '../modules/productModule/product.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import { checkFile, uploadMemory } from '~/middleware/multer.middleware'
import { validator } from '~/middleware/validate.middleware'
import { checkProductId, productUpdateValidate, productValidate } from '~/validator/product.validator'
import { IProduct } from '~/modules/productModule/product.interface'
const router = Router()

router.post(
  '/create',
  validator<IProduct>(productValidate),
  uploadMemory.fields([
    { name: 'image', maxCount: 3 },
    { name: 'video', maxCount: 5 }
  ]),
  checkFile,
  errAsyncHandlerMiddleware(ProductCotroller.createProduct)
)
router.patch(
  '/update',
  uploadMemory.fields([
    { name: 'image', maxCount: 3 },
    { name: 'video', maxCount: 5 }
  ]),
  checkFile,
  validator<IProduct>(productUpdateValidate),
  errAsyncHandlerMiddleware(ProductCotroller.updateProduct)
)
router.post('/getById', validator<IProduct>(checkProductId), errAsyncHandlerMiddleware(ProductCotroller.getByIdProduct))
router.get('/getAll', errAsyncHandlerMiddleware(ProductCotroller.getAllProduct))
router.delete(
  '/delete/:id',
  validator<IProduct>(checkProductId),
  errAsyncHandlerMiddleware(ProductCotroller.deleteProductById)
)

export default router
