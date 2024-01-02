import { Document, model, models, Schema, Types } from "mongoose";
// Define the TypeScript interface for the Order extending from Document
console.log(Types);
export interface IOrder {
  stripeId: string;
  createdAt?: Date;
  buyers: Types.ObjectId;
  totalAmount: number;
  event: Types.ObjectId;
}
// Define the Mongoose schema for the Order
const orderSchema = new Schema<IOrder>({
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  buyers: {
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
});

// Export the Mongoose model for the Order
const Order = models.Order || model<IOrder>("Order", orderSchema);

export default Order;
