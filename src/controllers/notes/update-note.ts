import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { UpdateNoteUsecase } from "../../app/use-cases/notes/update-note.ts";

const updateNoteScheme = z.object({
  owner: z.string(),
  note: z.object({
    id: z.string(),
    content: z.array(z.string())
  })
})

export class UpdateNoteController {
  constructor(private usecase: UpdateNoteUsecase){}
  public handle = async (req: Request, res: Response) => {
    const { note, owner } = await zParse(updateNoteScheme, req); 

  
    const updatedNote = await this.usecase.execute({
      noteId: note.id,
      owner: owner,
      content: note.content
    })
   
    res.status(200).json({
      id: updatedNote.id
    })
  }
}