import { Router } from 'express'
import ProductCotroller from '../modules/productModule/product.controller'
const router = Router()

router.post('/create', ProductCotroller.createProduct)
router.get('/get/:id', ProductCotroller.getByIdProduct)
router.get('/getAll', ProductCotroller.getAllProduct)
router.patch('/update/:id', ProductCotroller.updateProduct)
router.delete('/delete/:id', ProductCotroller.removeProduct)

export default router
