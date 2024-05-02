import { PrismaClient } from '@prisma/client'

class ProductServices {
  create(payload: any) {
    const prisma = new PrismaClient()
    prisma.product.create
  }
}
export default new ProductServices()
