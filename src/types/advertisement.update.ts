import { z } from "zod";

import {advertisementUpdateSchema} from "../schemas/advertisement.update.schema.ts";

export type AdvertisementUpdate = z.infer<typeof advertisementUpdateSchema>;