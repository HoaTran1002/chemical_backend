import { Router } from 'express'
import CategorieCotroller from '../modules/dataFileModule/dataFile.controller'
const router = Router()

router.post('/create', CategorieCotroller.createCategorie)
router.get('/get/:id', CategorieCotroller.getByIdCategorie)
router.get('/getAll', CategorieCotroller.getAllCategorie)
router.patch('/update/:id', CategorieCotroller.updateCategorie)
router.delete('/delete/:id', CategorieCotroller.removeCategorie)

export default router
