"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFile = exports.uploadMemory = void 0;
var multer_1 = __importDefault(require("multer"));
var ApiError_1 = __importDefault(require("../utils/ApiError"));
var fileFilter = function (req, file, cb) {
    if (file.fieldname === 'image' && !file.mimetype.startsWith('image/')) {
        var err = new ApiError_1.default(404, 'Invalid image file. that not is image');
        return cb(err);
    }
    else if (file.fieldname === 'video' && !file.mimetype.startsWith('video/')) {
        var err = new ApiError_1.default(404, 'Invalid video file. that not is video');
        return cb(err);
    }
    cb(null, true);
};
exports.uploadMemory = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    fileFilter: fileFilter
});
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
var checkFile = function (req, res, next) {
    try {
        if (req.files) {
            var files = req.files;
            var totalSize_1 = 0;
            if (files['image']) {
                files['image'].forEach(function (file) {
                    if (file.size > 5 * 1024 * 1024) {
                        // 5MB
                        throw new ApiError_1.default(400, "Image file size should not exceed 5MB. File ".concat(file.originalname, " is too large."));
                    }
                    totalSize_1 += file.size;
                });
            }
            if (files['video']) {
                files['video'].forEach(function (file) {
                    if (file.size > 200 * 1024 * 1024) {
                        // 200MB
                        throw new ApiError_1.default(400, "Video file size should not exceed 200MB. File ".concat(file.originalname, " is too large."));
                    }
                    totalSize_1 += file.size;
                });
            }
            if (totalSize_1 > 500 * 1024 * 1024) {
                // 500MB
                throw new ApiError_1.default(400, 'Total file size should not exceed 500MB.');
            }
        }
        next();
    }
    catch (error) {
        next(new ApiError_1.default(400, error.message));
    }
};
exports.checkFile = checkFile;
