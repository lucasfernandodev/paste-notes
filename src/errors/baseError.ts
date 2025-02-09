import { HttpStatusCode } from "../utils/http-status-code.ts";

export class BaseError extends Error{
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  // Operational errors: Errors esperados, como input invalid por parte da api
  // Programmer errors: Bugs erros não esperados.
  constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean){
    super(description)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this)
  }
}