import mongoose from "mongoose";
import { IUser } from "./User";

export interface INote extends mongoose.Document {
  owner: IUser["_id"];
  title: string;
  text: string;
}

const noteSchema: mongoose.Schema = new mongoose.Schema(
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
