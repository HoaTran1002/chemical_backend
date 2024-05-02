import { Router } from 'express'
import ProductCotroller from '../modules/productModule/product.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
import { uploadMemory } from '~/middleware/multer.middleware'
const router = Router()

router.post(
  '/create',
  uploadMemory.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
  ]),
  errAsyncHandlerMiddleware(ProductCotroller.createProduct)
)
router.get('/get/:id', errAsyncHandlerMiddleware(ProductCotroller.getByIdProduct))
router.get('/getAll', errAsyncHandlerMiddleware(ProductCotroller.getAllProduct))
router.patch('/update/:id', errAsyncHandlerMiddleware(ProductCotroller.updateProduct))
router.delete('/delete/:id', errAsyncHandlerMiddleware(ProductCotroller.removeProduct))

export default router
