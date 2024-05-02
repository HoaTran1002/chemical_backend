import Joi, { string } from 'joi'
import { ICategorie } from '~/modules/categorieModule/categorie.interface'

export const categorieValidate = (data: ICategorie) => {
  const categorie = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    type: Joi.string().valid('FEATURE', 'GROUPH_CHEMICAL').required()
  })
  return categorie.validate(data)
}
