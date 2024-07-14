import dotenv from 'dotenv'
dotenv.config()
export default {
  // jwt
  SECRET_KEY_ACCESS_TOKEN: process.env.SECRET_KEY_ACCESS_TOKEN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
}
