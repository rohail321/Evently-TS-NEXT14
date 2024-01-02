import { Document, Schema, model, models } from "mongoose";

console.log(Document);

export interface ICategory {
  _id: string;
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
});

const Category =
  models.Category || model<ICategory>("Category", categorySchema);
export default Category;
