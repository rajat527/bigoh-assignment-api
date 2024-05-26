export class ResponseDto<T> {
    statusCode: number;
    message: string;
    data?: T;
    errors?: any;
  
    constructor(statusCode: number, message: string, data?: T, errors?: any) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.errors = errors;
    }
  }
  