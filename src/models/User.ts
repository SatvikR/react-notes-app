import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  notes: mongoose.Types.ObjectId[];
}

const userSchema: mongoose.Schema = new mongoose.Schema(
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
