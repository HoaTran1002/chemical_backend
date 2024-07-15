import { PrismaClient } from '@prisma/client'
import { ICategorie } from '~/modules/categorieModule/categorie.interface'
import ApiError from '~/utils/ApiError'

class CategoryService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createCategory(category: ICategorie): Promise<ICategorie> {
    const record = await this.prisma.categorie.create({
      data: category
    })
    return record
  }

  async getCategoryById(id: string): Promise<ICategorie | null> {
    const category = await this.prisma.categorie.findUnique({
      where: { id }
    })
    return category
  }

  async getAllCategories(): Promise<ICategorie[]> {
    const categories = await this.prisma.categorie.findMany()
    return categories
  }

  async updateCategory(id: string, categoryData: Partial<ICategorie>): Promise<ICategorie> {
    const category = await this.prisma.categorie.update({
      where: { id },
      data: categoryData
    })
    return category
  }

  async deleteCategory(id: string): Promise<void> {
    await this.prisma.categorie.delete({
      where: { id }
    })
  }
}

export default new CategoryService()
