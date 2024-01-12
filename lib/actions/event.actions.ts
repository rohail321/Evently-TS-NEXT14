"use server";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  UpdateEventParams,
} from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { handleError } from "../utils";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const populateEvent = async (query: any) => {
  return query
    .populate({ path: "organizer", model: User, select: "_id firstName" })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not find");
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));
    if (!event) throw new Error("Event not found");
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventById = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();
    const event = Event.findByIdAndDelete(eventId);
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();
    const conditions = {};
    const eventQuery = await Event.find()
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit)
      .populate({ path: "organizer", model: User, select: "_id firstName" })
      .populate({ path: "category", model: Category, select: "_id name" });

    const eventsCount = await Event.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(eventQuery)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const updateEvent = async ({
  event,
  userId,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDatabase();
    const eventExist = await Event.findById(event._id);

    if (!eventExist || eventExist.organizer.toHexString() !== userId)
      throw new Error("Event does not exist or Unauthorized");

    const updateEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updateEvent));
  } catch (error) {}
};

export const getEvetByCategory = async () => {
  await connectToDatabase();
  const eventQuery = await Event.find()
    .sort({ createdAt: "desc" })
    .skip(0)
    .limit(4)
    .populate({ path: "organizer", model: User, select: "_id firstName" })
    .populate({ path: "category", model: Category, select: "_id name" })
    .where("name")
    .equals("");

  return JSON.parse(JSON.stringify(eventQuery));
};

export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = await Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({ path: "organizer", model: User, select: "_id firstName" })
      .populate({ path: "category", model: Category, select: "_id name" });

    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(eventsQuery)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
  }
}
