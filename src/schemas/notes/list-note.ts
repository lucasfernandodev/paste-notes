import { z } from "zod";

export const listNoteSchema = z.object({
  owner: z.string().min(1, { message: 'Error! Owner deve estar vazio' })
})