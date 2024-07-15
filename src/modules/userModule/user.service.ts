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
    let role
    console.log('user role id', user.idRole)
    if (user.idRole) {
      role = await this.prisma.role.findUnique({
        where: { id: user.idRole }
      })
      console.log('admin')
    } else if (!role) {
      role = await this.prisma.role.findFirst({
        where: { roleName: 'nv' }
      })

      if (!role) {
        role = await this.prisma.role.create({
          data: { roleName: 'nv' }
        })
      }
      console.log('nv')
    }

    const hashedPassword = await bcrypt.hash(user.passWord, 10)

    const data: any = {
      userName: user.userName,
      passWord: hashedPassword,
      idRole: role ? role.id : ''
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
    if (userData.passWord) {
      const hashedPassword = await bcrypt.hash(userData.passWord, 10)

      userData.passWord = hashedPassword
    }
    const user = await this.prisma.user.update({
      where: { id },
      data: userData
    })
    return user
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.$transaction(async (prisma) => {
        await prisma.refreshToken.deleteMany({
          where: { userId: id }
        })

        await prisma.user.delete({
          where: { id: id }
        })
      })

      console.log(`User with id ${id} has been deleted successfully.`)
    } catch (error: any) {
      console.error('Error deleting user:', error)
      throw new ApiError(500, error.message)
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany()
    return users
  }
}

export default new UserServices()
