import { Request, Response } from 'express'
import { IResonseObject } from '~/interface/response.interface'
import { ICategorie } from './categorie.interface'
import CategoryServices from './categorie.service'

class CategorieCotroller {
  async createCategorie(
    req: Request<unknown, unknown, ICategorie>,
    res: Response
  ): Promise<Response<IResonseObject> | void> {
    const reqBody = req.body
    const record = await CategoryServices.create(reqBody)
    const response: IResonseObject = {
      message: 'create success',
      status: 200,
      data: record
    }
    return res.status(200).json(response)
  }
  getByIdCategorie(req: Request, res: Response) {}
  getAllCategorie(req: Request, res: Response) {}
  updateCategorie(req: Request, res: Response) {}
  removeCategorie(req: Request, res: Response) {}
}
export default new CategorieCotroller()
