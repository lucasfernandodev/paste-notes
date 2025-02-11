import type { Request, Response } from "express";
import { z } from "zod";
import { zParse } from "../../utils/z-parse.ts"; 
import { GetUserUsecase } from "../../app/use-cases/users/get-user.ts";

const ownerScheme = z.object({
  owner: z.string()
})

export class GetUserController {
  constructor(private usecase: GetUserUsecase){}

  public handle = async (req: Request, res: Response) => {
    const { owner } = await zParse(ownerScheme, req, 'query');

    const user = await this.usecase.execute({
      id: owner
    })

    res.status(200).json({
      user: user
    })
  }
}