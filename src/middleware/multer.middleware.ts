import multer from 'multer'

export const uploadMemory = multer({
  storage: multer.memoryStorage()
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
