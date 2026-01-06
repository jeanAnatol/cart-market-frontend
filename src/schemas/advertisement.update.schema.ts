import {z} from "zod";

export const vehicleDetailsUpdateSchema = z.object({
  vehicleTypeId: z.number().int().positive().optional(),
  makeId: z.number().int().positive().optional(),
  modelId: z.number().int().positive().optional(),
  manufactureYear: z.string().regex(/^\d{4}$/).optional(),
  mileage: z.number().int().nonnegative().optional(),
  color: z.string().min(1).optional(),
  state: z.string().optional(),
  vehicleDescriptionText: z.string().min(10).optional(),
});

export const engineSpecUpdateSchema = z.object({
  displacement: z.number().positive().optional(),
  fuelTypeId: z.number().int().positive().optional(),
  gearboxType: z.string().optional(),
  horsePower: z.number().positive().optional(),
});

export const contactInfoUpdateSchema = z.object({
  sellerName: z.string().min(2).optional(),
  email: z.string().optional(),
  telephoneNumber1: z.string().min(6).optional(),
  telephoneNumber2: z.string().optional(),
});

export const locationUpdateSchema = z.object({
  locationName: z.string().min(2).optional(),
  postalCode: z.string().min(3).optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(),
});

export const advertisementUpdateSchema = z.object({
  adUuid: z.string(),
  
  price: z.number().positive().optional(),
  
  deleteOldAttachments: z.boolean().default(false).optional(),
  
  vehicleDetailsUpdateDTO: vehicleDetailsUpdateSchema.optional(),
  engineSpecUpdateDTO: engineSpecUpdateSchema.optional(),
  contactInfoUpdateDTO: contactInfoUpdateSchema.optional(),
  locationUpdateDTO: locationUpdateSchema.optional(),
  
  images: z.array(z.instanceof(File)).optional(),
});


