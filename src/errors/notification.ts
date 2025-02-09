import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";

 

export class NotificationError extends BaseError{
  constructor(description = 'Notification Error'){
    super('Notification Error', HttpStatusCode.INTERNAL_SERVER, description, false)
  }
}