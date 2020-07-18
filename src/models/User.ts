import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  notes: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    notes: [{ type: mongoose.Types.ObjectId, ref: "Note" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
