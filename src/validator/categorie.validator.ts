import Joi, { string } from 'joi'
import { ICategorie } from '~/modules/categorieModule/categorie.interface'

export const categorieValidate = (data: ICategorie) => {
  const account = Joi.object({
    name: Joi.string(),
    type: Joi.string().valid('FEATURE', 'GROUPH_CHEMICAL').required()
  })
  return account.validate(data)
}
