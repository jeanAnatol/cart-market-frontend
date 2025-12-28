import { z } from "zod";

export const vehicleDetailsInsertSchema = z.object({
  vehicleTypeId: z.number().int().positive(),
  makeId: z.number().int().positive(),
  modelId: z.number().int().positive(),
  manufactureYear: z.string().regex(/^\d{4}$/),
  mileage: z.number().int().nonnegative(),
  color: z.string().min(1),
  state: z.string(),
  vehicleDescriptionText: z.string().min(10),
});


export const engineSpecInsertSchema = z.object({
  displacement: z.number().positive(),
  fuelTypeId: z.number().int().positive(),
  gearboxType: z.string(),
  horsePower: z.number().positive(),
});


export const contactInfoInsertSchema = z.object({
  sellerName: z.string().min(2),
  email: z.string(),
  telephoneNumber1: z.string().min(6),
  telephoneNumber2: z.string().optional(),
});


export const locationInsertSchema = z.object({
  locationName: z.string().min(2),
  postalCode: z.string().min(3),
  longitude: z.string(),
  latitude: z.string(),
});


export const advertisementInsertSchema = z.object({
  userId: z.number().int().positive(),
  price: z.number().positive(),
  
  vehicleDetailsInsertDTO: vehicleDetailsInsertSchema,
  engineSpecInsertDTO: engineSpecInsertSchema,
  contactInfoInsertDTO: contactInfoInsertSchema,
  locationInsertDTO: locationInsertSchema,
  
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required"),
});
