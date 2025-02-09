import { HTTP400Error } from "../../../errors/BadRequest.ts";
import { prisma } from "../../../services/prisma.ts";

export interface CreateNoteUsecaseData {
  owner: string;
  note: {
    id: string,
    content: string[]
  }
}

export class CreateNoteUsecase {
  public execute = async (data: CreateNoteUsecaseData) => {
    const { note, owner } = data;

    const isOwner = await prisma.user.findFirst({ where: { id: owner } })

    if (!isOwner) {
      throw new HTTP400Error('O criador da nota informado é invalido')
    }

    const id = note.id;
    const content = note.content;

    try {
      const note = await prisma.notes.create({
        data: {
          id: id,
          content: JSON.stringify(content),
          owner: owner
        }
      })


      return {
        id: note.id,
        owner: note.owner,
        content: JSON.parse(note.content) as string[]
      }


    } catch (error) {
      console.error('Error ao criar nota', error)
      throw new HTTP400Error('Não foi possivel criar nota')
    }
  }
}