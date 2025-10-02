import {z} from 'zod'

export const loginSchema = z.object({
    identity: z.string()
      .min(3, "Identity must be at least 3 characters")
      .max(100, "Identity is too long"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
  });