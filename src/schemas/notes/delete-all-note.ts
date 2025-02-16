import { z } from "zod";

export const deleteAllNoteSchema = z.object({
  owner: z.string()
})