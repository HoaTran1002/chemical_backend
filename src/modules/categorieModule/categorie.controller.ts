import { Request, Response, NextFunction } from 'express'
import CategoryService from '~/modules/categorieModule/categorie.service'
import ApiError from '~/utils/ApiError'
import { ICategorie } from './categorie.interface'

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryData: ICategorie = req.body
      const newCategory = await CategoryService.createCategory(categoryData)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const category = await CategoryService.getCategoryById(id)
      if (!category) {
        throw new ApiError(404, 'Category not found')
      }
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories()
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      const categoryData: Partial<ICategorie> = req.body
      const updatedCategory = await CategoryService.updateCategory(id, categoryData)
      res.status(200).json(updatedCategory)
    } catch (error) {
      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body
      await CategoryService.deleteCategory(id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryController()
