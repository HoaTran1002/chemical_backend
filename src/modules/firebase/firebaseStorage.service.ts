import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { firebaseConfig } from '~/config/firebase.config'
import { v4 as uuid } from 'uuid'
import { IDataFile } from '../dataFileModule/dataFile.interface'

export interface IPramsUploadFile {
  name: string
  mimetype: string
  file: Express.Multer.File
}
initializeApp(firebaseConfig)
interface IResponseUploadFile {
  name: string
  url: string
}
export const uploadFileService = async (prams: IPramsUploadFile): Promise<IResponseUploadFile> => {
  const metadata = {
    contentType: prams.file.mimetype
  }
  const storage = getStorage()
  const name = `${prams.name + uuid()}`
  const storageRef = ref(storage, `files/${name}`)
  const snapshot = await uploadBytesResumable(storageRef, prams.file.buffer, metadata)
  const downloadURL = await getDownloadURL(snapshot.ref)
  const result: IResponseUploadFile = {
    name: name,
    url: downloadURL
  }
  return result
}
export const deleteFileService = async (files: IDataFile[]): Promise<void> => {
  const storage = getStorage()

  try {
    for (const file of files) {
      const storageRef = ref(storage, `files/${file.name}`)
      await deleteObject(storageRef)
      console.log(`File ${file.name} deleted successfully`)
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error('Failed to delete file')
  }
}
