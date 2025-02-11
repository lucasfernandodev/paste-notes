import { HTTP400Error } from "../../../errors/BadRequest.ts";
import { ServerError } from "../../../errors/server-error.ts";
import { prisma } from "../../../services/prisma.ts";

export interface UpdateNoteUsecaseData {
  noteId: string;
  owner: string;
  content: string[]
}

export class UpdateNoteUsecase {
  
  public execute = async (data: UpdateNoteUsecaseData) => {
    const { content, noteId, owner } = data
    const updateAt = new Date().toISOString();

    const isOwner = await prisma.user.findFirst({ where: { id: owner } })

    if (!isOwner) {
      throw new HTTP400Error('O criador da nota informado é invalido')
    }

    const isNote = await prisma.notes.findFirst({ where: { id: noteId } });

    if (!isNote) {
      throw new HTTP400Error('Nota não existe')
    }

    try {
      const note = await prisma.notes.update({
        where: {
          id: noteId,
          owner: owner
        },
        data: {
          content: JSON.stringify(content),
          id: updateAt
        }
      })

      return {
        id: note.id,
        content: JSON.parse(note.content) as string[],
        owner: note.owner
      };

    } catch (error) {
      console.error('Error Update Note: ', error)
      throw new ServerError('Não foi possivel atualizar a nota');
    }
  }
}