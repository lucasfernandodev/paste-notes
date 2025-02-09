import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { prisma } from "../../services/prisma.ts";

const ownerScheme = z.object({
  owner: z.string()
})

export class GetUserController {
  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(ownerScheme, req, 'query');
    const user = await prisma.user.findFirst({
      where: {
        id: owner
      }
    })

    res.json({
      user: user
    })
  }
}