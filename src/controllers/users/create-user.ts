import type { Request, Response } from "express";
import { prisma } from "../../services/prisma.ts";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";

/**
 * Essa rota cria um novo usuário ou retorna o usuário caso ele exista
 */

const userScheme = z.object({
  id: z.string()
})

export class CreateUserController {
  public handle = async (req: Request, res: Response) => {
    const data = await zParse(userScheme, req);  

    const isUser = await prisma.user.findFirst({
      where: {
        id: data.id
      }
    })

    if (isUser) {
      res.json({ id: isUser.id })
      return;
    }

    const user = await prisma.user.create({
      data: {
        id: data.id
      }
    })

    res.json({
      id: user.id
    })
  }
}