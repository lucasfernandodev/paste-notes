import { z } from "zod";

export const updateNoteSchema = z.object({
  owner: z.string(),
  note: z.object({
    id: z.string(),
    content: z.array(z.string())
  })
})