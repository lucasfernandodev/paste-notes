import { prisma } from "../../../services/prisma.ts";

export interface GetUserUsecaseData {
  id: string
}

export class GetUserUsecase {
  public execute = async ({id}: GetUserUsecaseData) => {
    const user = await prisma.user.findFirst({
      where: {
        id: id
      }
    })

    return user;
  }
}