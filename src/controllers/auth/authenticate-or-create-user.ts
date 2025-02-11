import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { AuthenticateOrCreateUserUsecase } from "../../app/use-cases/auth/authenticate-or-create-user.ts";

/**
 * Essa rota cria um novo usuário ou retorna o usuário caso ele exista
 */

const userScheme = z.object({
  id: z.string()
})

export class AuthenticateOrCreateUserController {
  constructor(private usecase: AuthenticateOrCreateUserUsecase) { }

  public handle = async (req: Request, res: Response) => {
    const { id } = await zParse(userScheme, req);

    const user = await this.usecase.execute({
      id
    })

    res.json({
      id: user.id
    })
  }
}