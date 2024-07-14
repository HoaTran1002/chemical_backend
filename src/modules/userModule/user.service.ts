import { PrismaClient } from '@prisma/client'
import { IUser } from './user.interface'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcrypt'

class UserServices {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async createUser(user: IUser): Promise<IUser> {
    let role = await this.prisma.role.findFirst({ where: { roleName: 'nv' } })
    if (!role) {
      role = await this.prisma.role.create({
        data: { roleName: 'nv' }
      })
    }
    const hashedPassword = await bcrypt.hash(user.passWord, 10)

    const data: any = {
      userName: user.userName,
      passWord: hashedPassword
    }

    if (role) {
      data.idRole = role.id
    } else {
      data.idRole = ''
    }
    console.log('data create user:', data)
    const record = await this.prisma.user.create({
      data
    })
    return record
  }

  async findUserById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    return user
  }

  async findUserByName(userName: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { userName }
    })
    return user
  }

  async handleRegister(user: IUser): Promise<IUser> {
    const userExist = await this.findUserByName(user.userName)
    if (userExist) {
      throw new ApiError(409, 'User exists')
    }
    const record = await this.createUser(user)
    return record
  }

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        userId,
        token
      }
    })
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { token }
    })
  }

  async findRefreshToken(token: string): Promise<boolean> {
    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: { token }
    })
    return !!refreshToken
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userData
    })
    return user
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    })
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany()
    return users
  }
}

export default new UserServices()
