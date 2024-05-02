export interface IResonseObject {
  message: string
  data?: unknown
  status?: number
}
export class IResponseErrorObject {
  public message!: any
  public statusCode!: number
  constructor(message: any, statusCode = 400) {
    this.statusCode = statusCode
    this.message = message
  }
}
