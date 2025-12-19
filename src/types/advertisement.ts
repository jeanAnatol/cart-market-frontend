import { z } from "zod";
import { advertisementSchema } from "../schemas/advertisement.schema.ts";

export type Advertisement = z.infer<typeof advertisementSchema>;