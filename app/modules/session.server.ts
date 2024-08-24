import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().max(320),
  name: z.string().max(320),
  profile_image: z.string().url().optional(),
});

export type User = z.infer<typeof UserSchema>;
