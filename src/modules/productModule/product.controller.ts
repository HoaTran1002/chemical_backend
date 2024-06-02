import { NextFunction, Request, Response } from 'express'
import productService from '~/modules/productModule/product.service'
import { IProduct } from './product.interface'
import { UploadedFiles } from '~/interface/image.interface'
import { IPramsUploadFile, uploadFileService } from '../firebase/firebaseStorage.service'
class ProductCotroller {
  async createProduct(req: Request<any, unknown, IProduct>, res: Response) {
    const files = req.files as UploadedFiles

    if (files.image) {
      for (let i = 0; i < files.image.length; i++) {
        const imageLink = await uploadFileService({
          name: files.image[i].originalname,
          mimetype: files.image[i].mimetype,
          file: files.image[i]
        })
        console.log('image link:', imageLink)
      }
    }

    if (files.video) {
      for (let i = 0; i < files.video.length; i++) {
        const videoLink = await uploadFileService({
          name: files.video[i].originalname,
          mimetype: files.video[i].mimetype,
          file: files.video[i]
        })
        console.log('image link:', videoLink)
      }
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
