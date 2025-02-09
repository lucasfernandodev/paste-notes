import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { z } from "zod";
import { CreateNoteUsecase } from "../../app/use-cases/notes/create-note.ts";

const createNoteScheme = z.object({
  owner: z.string(),
  note: z.object({
    id: z.string(),
    content: z.array(z.string())
  })
})

export class CreateNoteController {
  constructor(private usecase: CreateNoteUsecase){}
  public handle = async (req: Request, res: Response) => {

    const { owner, note } = await zParse(createNoteScheme, req)
    
    const response = await this.usecase.execute({
      owner,
      note
    })

    res.status(201).json({
      note: response
    })
  }
}