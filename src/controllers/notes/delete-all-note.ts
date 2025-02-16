import type { Request, Response } from "express";
import { zParse } from "../../utils/z-parse.ts";
import { DeleteAllNoteUsecase } from "../../app/use-cases/notes/delete-all-notes.ts";
import { deleteAllNoteSchema } from "../../schemas/notes/delete-all-note.ts";

export class DeleteAllNoteController {
  constructor(private usecase: DeleteAllNoteUsecase) { }

  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(deleteAllNoteSchema, req, 'query');

    await this.usecase.execute({ owner })

    res.status(204).end()
  }
}