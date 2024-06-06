import Joi from 'joi'
import { IProduct } from '~/modules/productModule/product.interface'

export const productValidate = (data: IProduct) => {
  const product = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    blog: Joi.string()
  })
  return product.validate(data)
}
export const productUpdateValidate = (data: IProduct) => {
  const product = Joi.object({
    id: Joi.string().trim().required(),
    name: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    blog: Joi.string()
  })
  return product.validate(data)
}
export const checkProductId = (data: { id: string }) => {
  const product = Joi.object({
    id: Joi.string().trim().required()
  })
  return product.validate(data)
}
