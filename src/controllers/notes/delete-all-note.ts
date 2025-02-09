import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { prisma } from "../../services/prisma.ts";
import { HttpStatusCode } from "../../utils/http-status-code.ts";

export const ownerScheme = z.object({
  owner: z.string()
})

export class DeleteAllNoteController {
  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(ownerScheme, req, 'query');
   

    const isOwner = await prisma.user.findFirst({
      where: {
        id: owner
      }
    })

    if(!isOwner){
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error: true,
        message: 'Owner invalido'
      })
      return;
    }

    await prisma.notes.deleteMany({
      where: {
        owner
      }
    })

    res.status(204).end()
  }
}