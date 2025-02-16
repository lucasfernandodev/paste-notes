import { z } from "zod";

export const loginSchema = z.object({
  id: z.string().min(1, {message: 'Error! Não deixe o indêntificador vazio'})
})