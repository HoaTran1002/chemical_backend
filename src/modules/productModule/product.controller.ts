import { NextFunction, Request, Response } from 'express'
import productService, { IProductResponse } from '~/modules/productModule/product.service'
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
  async getByIdProduct(req: Request, res: Response): Promise<Response> {
    const reqBody = req.body
    const productRecord: IProductResponse = await productService.productDataAccessProcess(reqBody)
    console.log(productRecord)
    return res.json(productRecord)
  }
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
  async deleteProductById(req: Request, res: Response) {
    const body = req.body
    const result = await productService.productDeleteByIdProcess(body)
    return res.json(result)
  }
}
export default new ProductCotroller()
