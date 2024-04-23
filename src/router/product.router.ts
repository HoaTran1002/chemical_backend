import { Router } from 'express'
import ProductCotroller from '../modules/productModule/product.controller'
import { errAsyncHandlerMiddleware } from '~/middleware/errorHandlingMiddleware'
const router = Router()

router.post('/create', errAsyncHandlerMiddleware(ProductCotroller.createProduct))
router.get('/get/:id', errAsyncHandlerMiddleware(ProductCotroller.getByIdProduct))
router.get('/getAll', errAsyncHandlerMiddleware(ProductCotroller.getAllProduct))
router.patch('/update/:id', errAsyncHandlerMiddleware(ProductCotroller.updateProduct))
router.delete('/delete/:id', errAsyncHandlerMiddleware(ProductCotroller.removeProduct))

export default router
