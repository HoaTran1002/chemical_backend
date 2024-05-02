import { PrismaClient } from '@prisma/client'
import { ICategorie } from './categorie.interface'

class CategoryServices {
  async create(payload: ICategorie): Promise<ICategorie | any> {
    const prisma = new PrismaClient()
    const newCategory = await prisma.categorie.create({
      data: payload
    })
    return newCategory
  }
}
export default new CategoryServices()
