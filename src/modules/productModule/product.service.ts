import { PrismaClient } from '@prisma/client'
import { IProduct } from './product.interface'
import { IUploadedFiles } from '~/interface/image.interface'
import { uploadFileService } from '../firebase/firebaseStorage.service'

interface IBodyProductCreateProcess {
  files?: IUploadedFiles
  payload: IProduct
}
class ProductServices {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }
  async create(payload: IProduct): Promise<IProduct> {
    const record = await this.prisma.product.create({ data: payload })
    return record
  }
  async productCreateProcess(prams: IBodyProductCreateProcess) {
    await this.prisma.$transaction(async () => {
      if (prams.files) {
        if (prams.files.image) {
          for (let i = 0; i < prams.files.image.length; i++) {
            const imageLink = await uploadFileService({
              name: prams.files.image[i].originalname,
              mimetype: prams.files.image[i].mimetype,
              file: prams.files.image[i]
            })
            console.log('image link:', imageLink)
          }
        }
        if (prams.files.video) {
          for (let i = 0; i < prams.files.video.length; i++) {
            const videoLink = await uploadFileService({
              name: prams.files.video[i].originalname,
              mimetype: prams.files.video[i].mimetype,
              file: prams.files.video[i]
            })
            console.log('image link:', videoLink)
          }
        }
      }
    })
  }
}
export default new ProductServices()
