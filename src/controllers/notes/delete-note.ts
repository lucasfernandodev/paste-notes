import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { DeleteNoteUsecase } from "../../app/use-cases/notes/delete-note.ts";
import { deleteNoteSchema } from "../../schemas/notes/delete-note.ts";
 

export class DeleteNoteController {
  constructor(private usecase: DeleteNoteUsecase){}
  public handle = async (req: Request, res: Response) => {
    const { owner, id } = await zParse(deleteNoteSchema, req, 'query');
    await this.usecase.execute({
      owner,
      noteId: id,
    })
    
    res.status(204).end()
  }
}