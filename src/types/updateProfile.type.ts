import {z} from "zod";
import type {updateProfileSchema} from "../schemas/updateProfileSchema.ts";


export type UpdateProfileType = z.infer<
  typeof updateProfileSchema
>;