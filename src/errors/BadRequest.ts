import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";


export class HTTP400Error extends BaseError{
  constructor(description = 'Bad Request'){
    super('Bad Request', HttpStatusCode.BAD_REQUEST, description, true)
  }
}