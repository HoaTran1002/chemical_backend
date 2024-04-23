import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiErorr from '~/utils/apiError'
class ProductCotroller {
  createProduct(req: Request, res: Response) {}
  getByIdProduct(req: Request, res: Response) {}
  async getAllProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      setTimeout(() => {
        throw new Error('BROKEN')
      }, 1000)
    } catch (err: any) {
      const err: any = new ApiErorr(StatusCodes.BAD_REQUEST, 'err.message')
      next(err)
    }
  }

  updateProduct(req: Request, res: Response) {}
  removeProduct(req: Request, res: Response) {}
}
export default new ProductCotroller()
