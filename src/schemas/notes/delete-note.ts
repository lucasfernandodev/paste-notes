import { z } from "zod";

export const deleteNoteSchema = z.object({
  owner: z.string(),
  id: z.string()
})