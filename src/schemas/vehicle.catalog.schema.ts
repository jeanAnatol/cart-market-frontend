
import { z } from "zod";

export const modelSchema = z.object({
  id: z.number(),
  name: z.string(),
  vehicleType: z.string(),
});

export const makeSchema = z.object({
  id: z.number(),
  name: z.string(),
  models: z.array(modelSchema),
});

export const vehicleTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  makes: z.array(makeSchema),
});
