import {z} from "zod";

export const vehicleDetailsSchema = z.object({
  vehicleType: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  manufactureYear: z.coerce.string().min(1),
  mileage: z.coerce.number().int().nonnegative(),
  color: z.string().min(1),
  state: z.string().min(1),
  vehicleDescriptionText: z.string(),
});

export const engineSpecSchema = z.object({
  displacement: z.number().int().positive(),
  fuelType: z.string().min(1),
  gearboxType: z.string().min(1),
  horsePower: z.number().int().positive(),
});

export const contactInfoSchema = z.object({
  sellerName: z.string().min(1),
  email: z.string().min(1),
  telephoneNumber1: z.string().min(1),
  telephoneNumber2: z.string().min(1),
});

export const locationSchema = z.object({
  locationName: z.string().min(1),
  longitude: z.string().min(1),
  latitude: z.string().min(1),
  postalCode: z.string().min(1),
});

export const advertisementSchema = z.object({
  adName: z.string().min(1),
  uuid: z.string().min(1),
  userId: z.number().int().min(1),
  price: z.number().int().min(1),

  vehicleDetailsDTO: vehicleDetailsSchema,
  engineSpecDTO: engineSpecSchema,
  contactInfoDTO: contactInfoSchema,
  locationDTO: locationSchema,

  imageUrl: z.array(z.url()),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})