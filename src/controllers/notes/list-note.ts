import type { Request, Response } from "express";
import { prisma } from "../../services/prisma.ts";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";

const listNoteScheme = z.object({
  owner: z.string()
})

export class ListNoteController {
  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(listNoteScheme, req, 'query'); 

    const notes = await prisma.notes.findMany({
      where: {
        owner: owner
      },
      orderBy: {
        id: "desc"
      }
    })

    res.json({
      notes: notes.map(note => ({ ...note, content: JSON.parse(note.content) }))
    })
  }
}