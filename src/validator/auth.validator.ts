import Joi from 'joi'
import { IUser } from '~/modules/userModule/user.interface'

export const registerValidate = (data: IUser) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    passWord: Joi.string().required()
  })
  return schema.validate(data)
}

export const loginValidate = (data: { userName: string; passWord: string }) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    passWord: Joi.string().required()
  })
  return schema.validate(data)
}

export const refreshTokenValidate = (data: { refreshToken: string }) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(data)
}
