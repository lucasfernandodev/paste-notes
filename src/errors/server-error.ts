import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";

 

export class ServerError extends BaseError{
  constructor(description = 'Internal server error'){
    super('Internal server error', HttpStatusCode.INTERNAL_SERVER, description, false)
  }
}