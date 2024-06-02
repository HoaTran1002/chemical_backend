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

// Middleware để kiểm tra kích thước tệp tin
export const checkFileSize = (req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] }

  let totalSize = 0

  if (files['image']) {
    files['image'].forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB
        throw new ApiError(400, `Image file size should not exceed 5MB. File ${file.originalname} is too large.`)
      }
      totalSize += file.size
    })
  }

  if (files['video']) {
    files['video'].forEach((file) => {
      if (file.size > 200 * 1024 * 1024) {
        // 200MB
        throw new ApiError(400, `Video file size should not exceed 200MB. File ${file.originalname} is too large.`)
      }
      totalSize += file.size
    })
  }

  if (totalSize > 500 * 1024 * 1024) {
    // 500MB
    throw new ApiError(400, 'Total file size should not exceed 500MB.')
  }

  next()
}
