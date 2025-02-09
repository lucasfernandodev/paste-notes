import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { ListNoteUsecase } from "../../app/use-cases/notes/list-notes.ts";

const listNoteScheme = z.object({
  owner: z.string()
})

export class ListNoteController {
  constructor(private usecase: ListNoteUsecase) { }

  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(listNoteScheme, req, 'query');

    const notes = await this.usecase.execute({
      owner
    })

    res.status(200).json({
      notes: notes
    })
  }
}