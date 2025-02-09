import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";

 

export class HTTP404Error extends BaseError{
  constructor(description = 'Not Found'){
    super('Not Found', HttpStatusCode.NOT_FOUND, description, true)
  }
}