import { z } from "zod";

export const deleteNoteSchema = z.object({
  owner: z.string().min(1, { message: 'Error! Owner deve estar vazio' }),
  id: z.string()
})