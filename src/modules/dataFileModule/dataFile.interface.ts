export type TFileType = 'Video' | 'Image' | 'Document'
export interface IDataFileAttributes {
  id: string
  name: string
  link: string
  type: TFileType
  productId: string
}
