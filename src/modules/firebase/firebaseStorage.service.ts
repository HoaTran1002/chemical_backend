import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { firebaseConfig } from '~/config/firebase.config'
import { v4 as uuid } from 'uuid'

export interface IPramsUploadFile {
  name: string
  mimetype: string
  file: Express.Multer.File
}
initializeApp(firebaseConfig)
export const uploadFileService = async (prams: IPramsUploadFile): Promise<string> => {
  const metadata = {
    contentType: prams.file.mimetype
  }
  const storage = getStorage()
  const storageRef = ref(storage, `files/${prams.name + uuid()}`)
  const snapshot = await uploadBytesResumable(storageRef, prams.file.buffer, metadata)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}
