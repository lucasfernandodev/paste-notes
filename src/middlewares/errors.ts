import type { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/baseError.ts";
import { HttpStatusCode } from "../utils/http-status-code.ts";
import { errorHandle } from "../errors/ErrorHandle.ts";

export const errorMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (errorHandle.isTrustedError(err)) {
    const { httpCode, message } = err as BaseError
    res.status(httpCode).json({
      success: false,
      msg: message,
    });
    return
  }

  // Verifica se é um erro de JSON inválido enviado pelo usuário
  if ('type' in err && 'status' in err) {
    if (err.type === 'entity.parse.failed' && err.status === 400) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        msg: 'Formato inválido. JSON invalido.',
      });
      return
    }
  }

  await errorHandle.handleError(err)


  // Resposta genérica para erros internos
  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    success: false,
    msg: 'Internal server error',
  });
};