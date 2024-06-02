import { Router } from 'express'
import ProductCotroller from '../modules/productModule/product.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import { checkFileSize, uploadMemory } from '~/middleware/multer.middleware'
import { validator } from '~/middleware/validate.middleware'
import { productValidate } from '~/validator/product.validator'
import { IProduct } from '~/modules/productModule/product.interface'
const router = Router()

router.post(
  '/create',
  validator<IProduct>(productValidate),
  uploadMemory.fields([
    { name: 'image', maxCount: 3 },
    { name: 'video', maxCount: 5 }
  ]),
  checkFileSize,
  errAsyncHandlerMiddleware(ProductCotroller.createProduct)
)
router.get('/get/:id', errAsyncHandlerMiddleware(ProductCotroller.getByIdProduct))
router.get('/getAll', errAsyncHandlerMiddleware(ProductCotroller.getAllProduct))
router.patch('/update/:id', errAsyncHandlerMiddleware(ProductCotroller.updateProduct))
router.delete('/delete/:id', errAsyncHandlerMiddleware(ProductCotroller.removeProduct))

export default router
