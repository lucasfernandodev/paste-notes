import type { Request } from 'express';
import { ZodError, type ZodTypeAny, type z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { ServerError } from '../errors/server-error.ts';
import { HTTP400Error } from '../errors/BadRequest.ts';

export async function zParse<T extends ZodTypeAny>(
  schema: T,
  req: Request,
  dataLabel: 'body' | 'params' | 'query' = 'body'
): Promise<z.infer<T>> {
  try {
    return await schema?.parseAsync(req[dataLabel]);
  } catch (error) {

    if (error instanceof ZodError) {
      throw new HTTP400Error(fromZodError(error as ZodError).toString())
    }

    throw new ServerError('Ocorreu um erro. Tente novamente mais tarde')
  }
}