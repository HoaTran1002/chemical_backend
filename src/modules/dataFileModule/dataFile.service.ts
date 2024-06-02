// import { PrismaClient } from '@prisma/client'
// import { IDataFile } from './dataFile.interface'

// class DataFileServices {
//   private prisma: PrismaClient

//   constructor() {
//     this.prisma = new PrismaClient()
//   }

//   async create(payload: IDataFile): Promise<IDataFile> {
//     const record = await this.prisma.dataFile.create({
//       data: {
//         ...payload,
//         product: payload.product ? { connect: { id: payload.product.id } } : undefined
//       }
//     })
//     return record as IDataFile
//   }
// }

// export default new DataFileServices()
