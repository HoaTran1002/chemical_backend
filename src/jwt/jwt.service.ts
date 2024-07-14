import jwt from 'jsonwebtoken'
import env from '~/env'

class JWTService {
  private accessTokenSecret: string
  private refreshTokenSecret: string

  constructor() {
    this.accessTokenSecret = env.SECRET_KEY_ACCESS_TOKEN || 'SECRET_KEY_ACCESS_TOKEN'
    this.refreshTokenSecret = env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN_SECRET'
  }

  generateAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: '15s' })
  }

  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '360' })
  }

  decodeAccessToken(token: string): jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.accessTokenSecret) as jwt.JwtPayload
    } catch (e) {
      return null
    }
  }

  decodeRefreshToken(token: string): jwt.JwtPayload | null {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as jwt.JwtPayload
    } catch (e) {
      return null
    }
  }
}

export default new JWTService()
