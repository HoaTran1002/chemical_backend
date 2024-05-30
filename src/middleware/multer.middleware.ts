import multer, { FileFilterCallback, MulterError } from 'multer'
import { NextFunction, Request, Response } from 'express'
import ApiError from '~/utils/ApiError'

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.fieldname === 'image' && !file.mimetype.startsWith('image/')) {
    const err = new ApiError(404, 'Invalid image file. that not is image')
    return cb(err)
  } else if (file.fieldname === 'video' && !file.mimetype.startsWith('video/')) {
    const err = new ApiError(404, 'Invalid video file. that not is video')
    return cb(err)
  }

  cb(null, true)
}

export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  fileFilter
})

// const storage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb) => {
//     const uploadPath = env.PATH_DATA_FILE
//     // Kiểm tra xem thư mục uploadPath có tồn tại không
//     if (!fs.existsSync(uploadPath)) {
//       // Nếu không tồn tại, hãy tạo thư mục
//       fs.mkdirSync(uploadPath, { recursive: true }) // Sử dụng recursive để tạo các thư mục cha nếu cần thiết
//     }
//     cb(null, uploadPath)
//   },
//   filename: (req: Request, file: Express.Multer.File, cb) => {
//     const randomImageName = () => crypto.randomBytes(16).toString('hex')
//     const imageName: string = randomImageName()
//     cb(null, imageName + file.originalname)
//   }
// })

// export const uploadDisk: Multer = multer({
//   storage: storage
// })

export const multerErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        throw new ApiError(400, 'File is too large')
      case 'LIMIT_FILE_COUNT':
        throw new ApiError(400, 'File count limit exceeded')
      case 'LIMIT_UNEXPECTED_FILE':
        throw new ApiError(400, 'Unexpected file field')
      default:
        throw new ApiError(400, err.message)
    }
  }
  next(err)
}
