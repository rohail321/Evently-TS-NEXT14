import { Document, model, models, Schema, Types } from "mongoose";

// Define the TypeScript interface for the Order extending from Document
export interface IOrder {
  createdAt?: Date;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  totalAmount: number;
  event: {
    _id: string;
    title: string;
  };
  quantity: number;
}
// Define the Mongoose schema for the Order
const orderSchema = new Schema<IOrder>({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  quantity: { type: Number, required: true },
});

// Export the Mongoose model for the Order
const Order = models.Order || model<IOrder>("Order", orderSchema);

export default Order;
