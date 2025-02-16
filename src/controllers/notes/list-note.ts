import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { ListNoteUsecase } from "../../app/use-cases/notes/list-notes.ts";
import { listNoteSchema } from "../../schemas/notes/list-note.ts";


export class ListNoteController {
  constructor(private usecase: ListNoteUsecase) { }

  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(listNoteSchema, req, 'query');

    const notes = await this.usecase.execute({
      owner
    })

    res.status(200).json({
      notes: notes
    })
  }
}