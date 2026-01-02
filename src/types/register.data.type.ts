import type {registerSchema} from "../schemas/register.schema.ts";
import {z} from "zod";

export type RegisterFormData = z.infer<typeof registerSchema>;