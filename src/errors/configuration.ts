import { HttpStatusCode } from "../utils/http-status-code.ts";
import { BaseError } from "./baseError.ts";

  

/**
 * Represe an error that occurs due to a configuration issue.
 */
export class ConfigurationError extends BaseError{
  constructor(description = 'Configuration Error'){
    super('Configuration Error', HttpStatusCode.INTERNAL_SERVER, description, false)
  }
}