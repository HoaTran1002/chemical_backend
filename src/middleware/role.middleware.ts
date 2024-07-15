import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import ApiError from '~/utils/ApiError'
import env from '~/env'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const roleMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json(new ApiError(401, 'No token provided'))
    }

    try {
      const decoded = jwt.verify(token, env.SECRET_KEY_ACCESS_TOKEN!)
      const user = await prisma.user.findUnique({
        where: { id: (decoded as any).id },
        include: { role: true }
      })

      if (!user) {
        return res.status(401).json(new ApiError(401, 'Invalid token'))
      }
      console.log(user.idRole)
      const userRole = user.role.roleName
      console.log(userRole)
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json(new ApiError(403, 'Forbidden: You do not have the required role'))
      }
      next()
    } catch (error) {
      return res.status(401).json(new ApiError(401, 'Invalid token'))
    }
  }
}

export default roleMiddleware
