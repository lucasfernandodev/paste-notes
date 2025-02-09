import { HTTP400Error } from "../../../errors/BadRequest.ts";
import { prisma } from "../../../services/prisma.ts";

export interface ListNoteUsecaseData {
  owner: string;
}

export class ListNoteUsecase {
  public execute = async ({ owner }: ListNoteUsecaseData) => {
    const isOwner = await prisma.user.findFirst({ where: { id: owner } })

    if (!isOwner) {
      throw new HTTP400Error('O criador da nota informado é invalido')
    }

    const notes = await prisma.notes.findMany({
      where: {
        owner: owner
      },
      orderBy: {
        id: "desc"
      }
    })

    return notes.map(note => ({
      ...note,
      content: JSON.parse(note.content) as string[]
    }))
  }
}