import type { NextFunction, Request, Response } from 'express'

import type Joi from 'joi'
import { IResponseErrorObject } from '~/interface/response.interface'

interface IRequestPrams {
  keys: string[]
}
export const validator = <T>(validate: (object: T) => Joi.ValidationResult<T>) => {
  const middleware = (req: Request, _: Response, next: NextFunction) => {
    const valid = validate(req.body)

    if (valid.error) {
      throw new IResponseErrorObject(valid.error.message, 404)
    }
    next()
  }

  return middleware
}
export const validatePrams = function (requestPrams: IRequestPrams) {}
