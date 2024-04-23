import express from 'express'
import useRouter from './router/index.router'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { errorHandlingMiddleware } from '~/middleware/errorHandlingMiddleware'
dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
useRouter(app)
app.use(errorHandlingMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
