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
export const checkCategorieId = (data: { id: string }) => {
  const product = Joi.object({
    id: Joi.string().trim().required()
  })
  return product.validate(data)
}
export const categorieUpdateValidate = (data: ICategorie) => {
  const schema = Joi.object({
    id: Joi.string().uuid(),
    name: Joi.string().optional().required(),
    type: Joi.string().valid('FEATURE', 'GROUPH_CHEMICAL')
  })

  return schema.validate(data)
}
