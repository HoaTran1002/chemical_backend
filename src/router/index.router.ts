import { Express } from 'express'
import productRouter from '~/router/product.router'
const useRouter = (app: Express) => {
  app.use('/api/v1/product', productRouter)
}
export default useRouter
