import { HTTP400Error } from "../../../errors/BadRequest.ts";
import { prisma } from "../../../services/prisma.ts";

export interface DeleteAllNoteUsecaseData {
  owner: string;
}

export class DeleteAllNoteUsecase {
  public execute = async ({ owner }: DeleteAllNoteUsecaseData) => {
    const isOwner = await prisma.user.findFirst({
      where: {
        id: owner
      }
    })

    if (!isOwner) {
      throw new HTTP400Error('Owner invalido')
    }

    await prisma.notes.deleteMany({
      where: {
        owner
      }
    })
  }
}