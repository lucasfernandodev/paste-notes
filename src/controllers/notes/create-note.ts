import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { CreateNoteUsecase } from "../../app/use-cases/notes/create-note.ts";
import { createNoteSchema } from "../../schemas/notes/create-note.ts";
 

export class CreateNoteController {
  constructor(private usecase: CreateNoteUsecase){}
  public handle = async (req: Request, res: Response) => {

    const { owner, note } = await zParse(createNoteSchema, req)
    
    const response = await this.usecase.execute({
      owner,
      note
    })

    res.status(201).json({
      note: response
    })
  }
}