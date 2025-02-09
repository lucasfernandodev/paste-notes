import { BaseError } from "./baseError.ts";

class ErrorHandle {
  public async handleError(error: Error): Promise<void> { 
    console.log('\x1b[31m', '> Application error', error);
  }

  public isTrustedError(error: Error){
    if(error instanceof BaseError){
      return error.isOperational
    }

    return false;
  }
}

export const errorHandle = new ErrorHandle();