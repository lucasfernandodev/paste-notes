import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { ServerError } from "../../errors/server-error.ts";
import { prisma } from "../../services/prisma.ts";
import { HttpStatusCode } from "../../utils/http-status-code.ts";

const updateNoteScheme = z.object({
  owner: z.string(),
  note: z.object({
    id: z.string(),
    content: z.array(z.string())
  })
})

export class UpdateNoteController {
  public handle = async (req: Request, res: Response) => {
    const { note, owner } = await zParse(updateNoteScheme, req);
    const updateAt = new Date().toISOString()

    const isNote = await prisma.notes.findFirst({where: {id: note.id}});

    if(!isNote){
      res.status(HttpStatusCode.BAD_REQUEST).json({
        error: true,
        message: 'Nota não existe'
      })
      return
    }

    try {
      await prisma.notes.update({
        where: {
          id: note.id,
          owner: owner
        },
        data: {
          content: JSON.stringify(note.content),
          id: updateAt
        }
      })

      res.json({
        id: updateAt
      })
    } catch (error) {
      console.error('Error Update Note: ', error)
      throw new ServerError('Não foi possivel atualizar a nota');
    }
  }
}