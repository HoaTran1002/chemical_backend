import { PrismaClient } from '@prisma/client'
import { IProduct } from './product.interface'
import { IUploadedFiles } from '~/interface/image.interface'
import { deleteFileService, uploadFileService } from '../firebase/firebaseStorage.service'
import { IDataFile } from '../dataFileModule/dataFile.interface'
import ApiError from '~/utils/ApiError'

interface IBodyProduct {
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
  async productAndFileInitializationProcess(prams: IBodyProduct): Promise<IProduct> {
    const fileUploaded: IDataFile[] = []
    try {
      const result = await this.prisma.$transaction(
        async () => {
          if (prams.files) {
            if (prams.files.image) {
              for (let i = 0; i < prams.files.image.length; i++) {
                const imageUpload = await uploadFileService({
                  name: prams.files.image[i].originalname,
                  mimetype: prams.files.image[i].mimetype,
                  file: prams.files.image[i]
                })
                const file: IDataFile = {
                  name: imageUpload.name,
                  link: imageUpload.url,
                  type: prams.files.image[i].mimetype.toString()
                }
                fileUploaded.push(file)
                console.log('image link:', imageUpload.url)
              }
            }
            if (prams.files.video) {
              for (let i = 0; i < prams.files.video.length; i++) {
                const videoUpload = await uploadFileService({
                  name: prams.files.video[i].originalname,
                  mimetype: prams.files.video[i].mimetype,
                  file: prams.files.video[i]
                })
                const file: IDataFile = {
                  name: videoUpload.name,
                  link: videoUpload.url,
                  type: prams.files.image[i].mimetype.toString()
                }
                fileUploaded.push(file)
                console.log('image link:', videoUpload.url)
              }
            }
          }
          if (fileUploaded.length > 0) {
            const record = await this.prisma.product.create({
              data: { ...prams.payload, datafiles: { create: fileUploaded } }
            })
            return record
          } else {
            const record = await this.prisma.product.create({ data: prams.payload })
            return record
          }
        },
        {
          timeout: 60000 * 3
        }
      )

      return result
    } catch (error: any) {
      if (fileUploaded.length > 0) {
        deleteFileService(fileUploaded)
      }
      throw new ApiError(400, error.message)
    }
  }
  async productUpdateById(prams: IBodyProduct): Promise<IProduct> {
    const fileUploaded: IDataFile[] = []
    try {
      const result = await this.prisma.$transaction(
        async () => {
          if (prams.files) {
            if (prams.files.image) {
              for (let i = 0; i < prams.files.image.length; i++) {
                const imageUpload = await uploadFileService({
                  name: prams.files.image[i].originalname,
                  mimetype: prams.files.image[i].mimetype,
                  file: prams.files.image[i]
                })
                const file: IDataFile = {
                  name: imageUpload.name,
                  link: imageUpload.url,
                  type: prams.files.image[i].mimetype.toString()
                }
                fileUploaded.push(file)
                console.log('image link:', imageUpload.url)
              }
            }
            if (prams.files.video) {
              for (let i = 0; i < prams.files.video.length; i++) {
                const videoUpload = await uploadFileService({
                  name: prams.files.video[i].originalname,
                  mimetype: prams.files.video[i].mimetype,
                  file: prams.files.video[i]
                })
                const file: IDataFile = {
                  name: videoUpload.name,
                  link: videoUpload.url,
                  type: prams.files.image[i].mimetype.toString()
                }
                fileUploaded.push(file)
                console.log('image link:', videoUpload.url)
              }
            }
          }
          if (fileUploaded.length > 0) {
            const record = await this.prisma.product.update({
              where: { id: prams.payload.id },
              data: { ...prams.payload, datafiles: { create: fileUploaded } }
            })
            return record
          } else {
            const record = await this.prisma.product.update({ where: { id: prams.payload.id }, data: prams.payload })
            return record
          }
        },
        {
          timeout: 60000 * 3
        }
      )

      return result
    } catch (error: any) {
      if (fileUploaded.length > 0) {
        deleteFileService(fileUploaded)
      }
      throw new ApiError(400, error.message)
    }
  }
}
export default new ProductServices()
