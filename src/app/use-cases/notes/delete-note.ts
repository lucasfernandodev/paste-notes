import { HTTP400Error } from "../../../errors/BadRequest.ts";
import { ServerError } from "../../../errors/server-error.ts";
import { prisma } from "../../../services/prisma.ts";

export interface DeleteNoteUsecaseData {
  owner: string;
  noteId: string;
}

export class DeleteNoteUsecase {
  public execute = async ({ owner, noteId }: DeleteNoteUsecaseData) => {
    const isOwner = await prisma.user.findFirst({
      where: {
        id: owner
      }
    })

    if (!isOwner) {
      throw new HTTP400Error('Owner invalido')
    }

    const isNote = await prisma.notes.findFirst({
      where: { id: noteId }
    })

    if (!isNote) return;

    try {
      await prisma.notes.delete({
        where: {
          id: noteId,
          owner
        }
      })
    } catch (error) {
      console.error(error);
      throw new ServerError('Não foi possivel deletar a nota');
    }
  }
}