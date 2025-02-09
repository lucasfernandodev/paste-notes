import type { Request, Response } from "express";
import { prisma } from "../../services/prisma.ts";
import { zParse } from "../../utils/z-parse.ts";
import { z } from "zod";

const createNoteScheme = z.object({
  owner: z.string(),
  note: z.object({
    id: z.string(),
    content: z.array(z.string())
  })
})

export class CreateNoteController {
  public handle = async (req: Request, res: Response) => {

    const { owner, note } = await zParse(createNoteScheme, req)

    const isOwner = await prisma.user.findFirst({ where: { id: owner } })

    if (!isOwner) {
      res.status(404).json({
        error: true,
        message: 'O criador da nota informado é invalido'
      })
      return;
    }


    const id = note.id;
    const content = note.content;

    try {
      const note = await prisma.notes.create({
        data: {
          id: id,
          content: JSON.stringify(content),
          owner: owner
        }
      })
 
      res.status(201).json({
        note
      })

    } catch (error) {
      console.error('Error ao criar nota', error)
      res.status(400).json({
        error: true,
        message: 'Não foi possivel criar nota'
      })
    }

  }
}