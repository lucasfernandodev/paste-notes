import type { Request, Response } from "express";
import { prisma } from "../../services/prisma.ts";
import { zParse } from "../../utils/z-parse.ts";
import { z } from "zod";
import { ServerError } from "../../errors/server-error.ts";

const deleteNoteScheme = z.object({
  owner: z.string(),
  id: z.string()
})

export class DeleteNoteController {
  public handle = async (req: Request, res: Response) => {
    const { owner, id } = await zParse(deleteNoteScheme, req, 'query');

    try {
      await prisma.notes.delete({
        where: {
          id,
          owner
        }
      })

      res.status(204).end()
    } catch (error) {
     console.error(error);
     throw new ServerError('Não foi possivel deletar a nota');
    }
  }
}