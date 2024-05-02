import { NextFunction, Request, Response } from 'express'
import productService from '~/modules/productModule/product.service'
class ProductCotroller {
  async createProduct(req: Request, res: Response) {
    return productService.create({})
  }
  async getByIdProduct(req: Request, res: Response) {}
  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('BROKEN')) // Sử dụng reject thay vì throw new Error()
      }, 1000)
    })
  }
  async updateProduct(req: Request, res: Response) {}
  async removeProduct(req: Request, res: Response) {}
}
export default new ProductCotroller()
