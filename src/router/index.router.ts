import { Express } from 'express'
import productRouter from '~/router/product.router'
import categorieRouter from '~/router/categorie.router'
import userRouter from '~/router/user.router'
const useRouter = (app: Express) => {
  app.use('/api/v1/product', productRouter)
  app.use('/api/v1/categorie', categorieRouter)
  app.use('/api/v1/user', userRouter)
}
export default useRouter
