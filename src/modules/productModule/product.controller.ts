import { NextFunction, Request, Response } from 'express'
import productService from '~/modules/productModule/product.service'
import { IProduct } from './product.interface'
import { IUploadedFiles } from '~/interface/image.interface'
import { IPramsUploadFile, uploadFileService } from '../firebase/firebaseStorage.service'

class ProductCotroller {
  async createProduct(req: Request<any, unknown, IProduct>, res: Response) {
    const files = req.files as IUploadedFiles
    const reqBody = req.body
    const result = await productService.productAndFileInitializationProcess({ files: files, payload: reqBody })
    return res.json(result)
  }
  async getByIdProduct(req: Request, res: Response) {}
  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('BROKEN'))
      }, 1000)
    })
  }
  async updateProduct(req: Request, res: Response) {
    const files = req.files as IUploadedFiles
    const reqBody = req.body
    const result = await productService.productUpdateById({ files: files, payload: reqBody })
    return res.json(result)
  }
  async removeProduct(req: Request, res: Response) {}
}
export default new ProductCotroller()
