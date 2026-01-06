
import {z} from "zod";

export const updateProfileSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
})
  .refine(
    data =>
      !data.newPassword ||
      (data.currentPassword && data.confirmPassword),
    {
      message: "Current password and confirmation required",
      path: ["newPassword"],
    }
  )
  .refine(
    data =>
      !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );