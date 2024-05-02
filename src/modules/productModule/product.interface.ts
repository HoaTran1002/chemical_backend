import { ICategorie } from '../categorieModule/categorie.interface'

interface IProduct {
  id: string
  name: string
  title?: string | null
  description?: string | null
  blog?: string | null
}

interface IProductCategorie {
  productId: string
  categorieId: string
  product?: IProduct | null
  categorie?: ICategorie | null
}

export { IProduct, IProductCategorie }
