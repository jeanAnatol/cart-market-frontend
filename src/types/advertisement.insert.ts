import { z } from "zod";
import { advertisementInsertSchema } from "../schemas/advertisement.insert.schema.ts";

export type AdvertisementInsert = z.infer<
  typeof advertisementInsertSchema
>;
