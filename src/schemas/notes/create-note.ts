import { z } from "zod";

export const createNoteSchema = z.object({
  owner: z.string().min(1, { message: 'Error! Owner deve estar vazio' }),
  note: z.object({
    id: z.string(),
    content: z
    .array(z.string())
    .min(1, { message: 'Error! Content não pode estár vazio' })
  })
})