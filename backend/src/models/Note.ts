import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface INote extends Document {
  owner: IUser["_id"];
  title: string;
  text: string;
}

const noteSchema: Schema = new Schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INote>("Note", noteSchema);
