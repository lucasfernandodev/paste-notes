import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts";
import { DeleteAllNoteUsecase } from "../../app/use-cases/notes/delete-all-notes.ts";

export const ownerScheme = z.object({
  owner: z.string()
})

export class DeleteAllNoteController {
  constructor(private usecase: DeleteAllNoteUsecase) { }

  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(ownerScheme, req, 'query');

    await this.usecase.execute({ owner })
    
    res.status(204).end()
  }
}