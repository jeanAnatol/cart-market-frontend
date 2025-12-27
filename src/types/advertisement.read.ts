import { z } from "zod";
import { advertisementReadSchema } from "../schemas/advertisement.read.schema.ts";

export type AdvertisementRead = z.infer<typeof advertisementReadSchema>;