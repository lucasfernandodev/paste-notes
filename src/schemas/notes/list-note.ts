import { z } from "zod";

export const listNoteSchema = z.object({
  owner: z.string()
})