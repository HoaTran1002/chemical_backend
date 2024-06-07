import { NextFunction, Request, Response } from 'express'
import productService, { IProductResponse } from '~/modules/productModule/product.service'
import { IProduct } from './product.interface'
import { IUploadedFiles } from '~/interface/image.interface'
import { IPramsUploadFile, uploadFileService } from '../firebase/firebaseStorage.service'
import ApiResponseSuccess from '~/utils/ApiResponse'

class ProductCotroller {
  async createProduct(req: Request<any, unknown, IProduct>, res: Response) {
    const files = req.files as IUploadedFiles
    const reqBody = req.body
    const result = await productService.productAndFileInitializationProcess({ files: files, payload: reqBody })
    const response = new ApiResponseSuccess(200, result)
    return res.json(response)
  }
  async getByIdProduct(req: Request, res: Response): Promise<Response> {
    const reqBody = req.body
    const result: IProductResponse = await productService.productDataAccessProcess(reqBody)
    console.log(result)
    const response = new ApiResponseSuccess(200, result)
    return res.json(response)
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
    const response = new ApiResponseSuccess(200, result)
    return res.json(response)
  }
  async deleteProductById(req: Request, res: Response) {
    const body = req.body
    const result = await productService.productDeleteByIdProcess(body)
    const response = new ApiResponseSuccess(200, result)
    return res.json(response)
  }
}
export default new ProductCotroller()
