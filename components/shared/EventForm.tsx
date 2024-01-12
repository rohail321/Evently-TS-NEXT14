"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import DatePicker from "react-datepicker";
import { Button } from "../ui/button";
import { eventFormSchema } from "@/lib/validator";
import Dropdown from "@/components/shared/Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
type Props = {
  userId: { userId: string };
  type: "Create" | "Update";
  event?: IEvent;
};
function EventForm({ userId: { userId }, type, event }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");
  const router = useRouter();

  const initialValues = {
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: "",
    price: "",
    isFree: false,
    url: "",
  };

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: type === "Create" ? initialValues : event,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {}
    }
    if (typeof event === "undefined") {
      return;
    }

    if (type === "Update") {
      console.log(values);
      const editEvent = await updateEvent({
        event: {
          ...values,
          imageUrl: uploadedImageUrl,
          _id: event._id,
        },
        userId,
        path: `/events/${event._id}`,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
      >
        <div className='flex flex-col gap-5 md:flex-roq'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Event title'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Catrgory</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description'
                    {...field}
                    className='textare rounded-2xl'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hiddden rounded-full bg-gray-50 px-5'>
                    <Image
                      src='/assets/icons/location-grey.svg'
                      width={24}
                      height={24}
                      alt='calendar'
                    />
                    <Input
                      placeholder='Event location or Online'
                      {...field}
                      className='input-field'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <div className='flex items-center justify-start h-[54px] w-full overflow-hiddden rounded-full bg-gray-50 px-5'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      width={24}
                      height={24}
                      alt='calendar'
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-gray-500'>
                      Start Date
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datepicker'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <div className='flex items-center justify-start h-[54px] w-full overflow-hiddden rounded-full bg-gray-50 px-5'>
                    <Image
                      src='/assets/icons/calendar.svg'
                      width={24}
                      height={24}
                      alt='calendar'
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-gray-500'>
                      End Date
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datepicker'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <div className='flex items-center justify-start h-[54px] w-full overflow-hiddden rounded-full bg-gray-50 px-5'>
                    <Image
                      src='/assets/icons/dollar.svg'
                      width={24}
                      height={24}
                      alt='calendar'
                      className='filter-grey'
                    />
                    <input
                      type='number'
                      placeholder='Price'
                      {...field}
                      className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0focus-visible:ring-0 focus-visible:ring-offset-0 '
                    />
                    <FormField
                      control={form.control}
                      name='isFree'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center justify-start'>
                              <label
                                htmlFor='isFree'
                                className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                              >
                                Free Ticker
                              </label>
                              <Checkbox
                                id='isFree'
                                className='mr-2 h-5 w-5 border-2 border-primary-500'
                                onCheckedChange={field.onChange}
                                checked={field.value}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <div className='flex items-center justify-start h-[54px] w-full overflow-hiddden rounded-full bg-gray-50 px-5'>
                    <Image
                      src='/assets/icons/link.svg'
                      width={24}
                      height={24}
                      alt='url'
                      className='filter-grey'
                    />
                    <Input
                      placeholder='URL'
                      {...field}
                      className='input-field'
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type='submit'
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className='button col-span-2'
        >
          {form.formState.isSubmitting ? "Submiting.." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
}

export default EventForm;
