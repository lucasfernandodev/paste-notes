import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";

 
export class HTTP401Error extends BaseError{
  constructor(description: string){
    super('Unauthorized', HttpStatusCode.UNAUTHORIZED, description, true)
  }
}