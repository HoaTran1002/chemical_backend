import { NextFunction, Request, Response } from 'express'
import productService from '~/modules/productModule/product.service'
import { IProduct } from './product.interface'
import { UploadedFiles } from '~/interface/image.interface'
class ProductCotroller {
  async createProduct(req: Request<any, unknown, IProduct>, res: Response) {
    const files = req.files as UploadedFiles

    if (files.image) {
      console.log('Image file:', files.image)
    }

    if (files.video) {
      console.log('Video file:', files.video)
    }
    const reqBody = req.body
    return res.json(reqBody)
  }
  async getByIdProduct(req: Request, res: Response) {}
  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('BROKEN'))
      }, 1000)
    })
  }
  async updateProduct(req: Request, res: Response) {}
  async removeProduct(req: Request, res: Response) {}
}
export default new ProductCotroller()
