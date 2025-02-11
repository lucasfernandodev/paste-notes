import { prisma } from "../../../services/prisma.ts";

export interface AuthenticateOrCreateUserUsecaseData {
  id: string;
}
export class AuthenticateOrCreateUserUsecase {
  public execute = async ({ id }: AuthenticateOrCreateUserUsecaseData) => {
    const isUser = await prisma.user.findFirst({
      where: {
        id: id
      }
    })

    if (!isUser) {
      const user = await prisma.user.create({
        data: {
          id: id
        }
      })

      return user
    }

    return isUser
  } 
}