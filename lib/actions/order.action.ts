"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Order, { IOrder } from "../database/models/order.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";

type CreateOrderParams = {
  buyer: string;
  totalAmount: number;
  event: string;
  quantity: number;
};

type OrderArray = {
  _id: string;
  buyer: string;
  totalAmount: number;
  event: { _id: number; title: string };
  quantity: number;
  createdAt: Date;
};
export const createOrder = async ({
  buyer,
  totalAmount,
  event,
  quantity,
}: CreateOrderParams) => {
  try {
    await connectToDatabase();
    const createOrderByUser = await Order.create({
      buyer,
      totalAmount,
      event,
      quantity,
    });
    return JSON.parse(JSON.stringify(createOrderByUser));
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByBuyer = async (userId: string) => {
  try {
    const userOrder = await Order.find()
      .where("buyer")
      .equals(userId)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const orderParse = JSON.parse(JSON.stringify(userOrder));

    let modifiedArray = orderParse?.map((order: any) => {
      const { event } = order;
      return event;
    });

    return modifiedArray;
  } catch (error) {}
};

export const getOrderByOrganizer = async (userId: string) => {
  try {
    await connectToDatabase();
    const eventExist = await Event.find({ organizer: userId })
      .sort({ createdAt: "desc" })
      .skip(0)
      .populate({ path: "organizer", model: User, select: "_id firstName" })
      .populate({ path: "category", model: Category, select: "_id name" });

    if (!eventExist) throw new Error("No Event exist");

    const userOrder = await Order.find().populate({
      path: "event",
      model: Event,
      select: "_id title",
    });

    const eventParse = JSON.parse(JSON.stringify(eventExist));
    const orderParse = JSON.parse(JSON.stringify(userOrder));
    let orderArray: OrderArray[] = [];
    for (let i = 0; i < eventParse.length; i++) {
      for (let j = 0; j < orderParse.length; j++) {
        if (eventParse[i]._id === orderParse[j].event._id) {
          if (orderParse[i] === undefined) {
            continue;
          }
          orderArray.push(orderParse[i]);
        }
      }
    }
    return orderArray;
  } catch (error) {
    console.log(error);
  }
};
