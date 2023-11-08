import HttpStatusCode from "../enums/HttpStatus.js";
export class BaseError extends Error {
    constructor(name, httpCode, description, isOperational) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
export class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER_ERROR, isOperational = true, description = 'Internal Server Error') {
        super(name, httpCode, description, isOperational);
        this.name = name;
        this.isOperational = isOperational;
        this.description = description;
    }
}
//# sourceMappingURL=ApiError.js.map