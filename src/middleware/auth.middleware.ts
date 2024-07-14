import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '~/utils/ApiError'
import env from '~/env'
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.json(new ApiError(401, 'No token provided'))
  }
  jwt.verify(token, env.SECRET_KEY_ACCESS_TOKEN!, (err, decoded) => {
    if (err) {
      return res.status(401).json(new ApiError(401, 'Invalid token'))
    }
    next()
  })
}
export default authMiddleware
