class ApiResponseSuccess<T> {
  statusCode: number
  result: T
  constructor(statusCode: number, result: T) {
    this.statusCode = statusCode
    this.result = result
  }
}
export default ApiResponseSuccess
