"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventBookingForm } from "@/lib/validator";
import { IEvent } from "@/lib/database/models/event.model";
import { createOrder } from "@/lib/actions/order.action";

const formSchema = z.object({
  quantity: z.string(),
});
function OrderForm({
  eventId,
  userId,
  price,
}: {
  eventId: string;
  userId: string;
  price: number;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: "0",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      buyer: userId,
      totalAmount: (+values.quantity as unknown as number) * price,
      event: eventId,
      quantity: +values.quantity as unknown as number,
    };
    const order = await createOrder(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  min={1}
                  max={3}
                  type='number'
                  placeholder='Quantity'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className='button col-span-2'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default OrderForm;
