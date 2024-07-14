import { Request, Response } from 'express'
import userServices from '~/modules/userModule/user.service'
import jwtService from '~/jwt/jwt.service'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcrypt'
import { IUser } from './user.interface'

class UserController {
  async register(req: Request<any, unknown, IUser>, res: Response): Promise<Response> {
    try {
      const user = await userServices.handleRegister(req.body)
      const accessToken = jwtService.generateAccessToken({ id: user.id, role: user.idRole })
      const refreshToken = jwtService.generateRefreshToken({ id: user.id, role: user.idRole })

      await userServices.saveRefreshToken(user.id, refreshToken)

      return res.status(201).json({ user, accessToken, refreshToken })
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async logIn(req: Request, res: Response): Promise<Response> {
    try {
      const { userName, passWord } = req.body
      const user = await userServices.findUserByName(userName)

      if (!user || !(await bcrypt.compare(passWord, user.passWord))) {
        throw new ApiError(401, 'Invalid username or password')
      }

      const accessToken = jwtService.generateAccessToken({ id: user.id, role: user.idRole })
      const refreshToken = jwtService.generateRefreshToken({ id: user.id, role: user.idRole })

      await userServices.saveRefreshToken(user.id, refreshToken)

      return res.status(200).json({ user, accessToken, refreshToken })
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body
      await userServices.deleteRefreshToken(refreshToken)
      return res.status(200).json({ message: 'Logged out successfully' })
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    try {
      const { refreshToken } = req.body
      const decoded = jwtService.decodeRefreshToken(refreshToken)
      if (!decoded || !(await userServices.findRefreshToken(refreshToken))) {
        throw new ApiError(401, 'Invalid refresh token')
      }

      const user = await userServices.findUserById(decoded.id)
      if (!user) {
        throw new ApiError(404, 'User not found')
      }

      const newAccessToken = jwtService.generateAccessToken({ id: user.id, role: user.idRole })
      const newRefreshToken = jwtService.generateRefreshToken({ id: user.id, role: user.idRole })

      await userServices.saveRefreshToken(user.id, newRefreshToken)

      return res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async createUser(req: Request<any, unknown, IUser>, res: Response): Promise<Response> {
    try {
      const user = await userServices.createUser(req.body)
      return res.status(201).json(user)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async updateUser(req: Request<any, unknown, IUser>, res: Response): Promise<Response> {
    try {
      const { id } = req.body
      const updatedUser = await userServices.updateUser(id, req.body)
      return res.status(200).json(updatedUser)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body
      await userServices.deleteUser(id)
      return res.status(200).json({ message: 'User deleted successfully' })
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userServices.getAllUsers()
      return res.status(200).json(users)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body
      const user = await userServices.findUserById(id)
      if (!user) {
        throw new ApiError(404, 'User not found')
      }
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }
}

export default new UserController()
