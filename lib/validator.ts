import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters.",
    })
    .max(400, "Description must be less then 400 characters"),
  location: z
    .string()
    .min(3, {
      message: "Location must be at least 3 characters.",
    })
    .max(400, "Location must be less then 400 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

export const eventBookingForm = z.object({
  // Name: z.string().min(3, {
  //   message: "Name must be at least 3 characters.",
  // }),
  // ticketQuantity: z.number(),
  // categoryId: z.string(),
  // price: z.string(),
  // isFree: z.boolean(),
  // url: z.string().url(),
});
