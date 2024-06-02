import { StatusCodes } from 'http-status-codes'
import { NextFunction, Request, Response } from 'express'

export const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }

  const responseError: { statusCode: number; message: string; stack?: string } = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode]
  }
  // Xử lý stack trace chỉ khi ở chế độ phát triển
  if (process.env.NODE_ENV === 'development') {
    responseError.stack = err.stack
  }
  return res.status(responseError.statusCode).json({ err: responseError })
}
export const errAsyncHandlerMiddleware = (
  asyncFun: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  const handleErr = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncFun(req, res, next)
    } catch (error: any) {
      next(error)
    }
  }
  return handleErr
}
