import { Schema, model, models, Document, Types } from "mongoose";

export interface IEvent {
  title: string;
  description?: string;
  location?: string;
  createdAt?: Date;
  imageUrl: string;
  startDateTime?: Date;
  endDateTime?: Date;
  price?: string;
  isFree: boolean;
  url: string;
  category?: Types.ObjectId;
  organizer?: Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startDateTime: { type: Date, default: Date.now },
  endDateTime: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model<IEvent>("Event", eventSchema);

export default Event;
