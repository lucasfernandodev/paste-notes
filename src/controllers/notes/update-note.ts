import type { Request, Response } from "express"; 
import { zParse } from "../../utils/z-parse.ts";
import { UpdateNoteUsecase } from "../../app/use-cases/notes/update-note.ts";
import { updateNoteSchema } from "../../schemas/notes/update-note.ts";
 

export class UpdateNoteController {
  constructor(private usecase: UpdateNoteUsecase){}
  public handle = async (req: Request, res: Response) => {
    const { note, owner } = await zParse(updateNoteSchema, req); 

  
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