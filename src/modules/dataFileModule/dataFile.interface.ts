import { IProduct } from '../productModule/product.interface'

export type TFileType = 'Video' | 'Image' | 'Document'

export interface IDataFile {
  id: string
  name: string
  link: string
  type: TFileType
  product?: IProduct | null
  productId?: string | null
}
