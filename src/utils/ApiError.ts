import HttpStatusCode from "../enums/HttpStatus.js";

class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    
    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
}

export class APIError extends BaseError {
    constructor(name: string, httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR, isOperational = true, description = 'Internal Server Error') {
        super(name, httpCode, description, isOperational);
    }
}