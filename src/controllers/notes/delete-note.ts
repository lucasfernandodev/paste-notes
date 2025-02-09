import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { z } from "zod"; 
import { DeleteNoteUsecase } from "../../app/use-cases/notes/delete-note.ts";

const deleteNoteScheme = z.object({
  owner: z.string(),
  id: z.string()
})

export class DeleteNoteController {
  constructor(private usecase: DeleteNoteUsecase){}
  public handle = async (req: Request, res: Response) => {
    const { owner, id } = await zParse(deleteNoteScheme, req, 'query');
    await this.usecase.execute({
      owner,
      noteId: id,
    })
    
    res.status(204).end()
  }
}