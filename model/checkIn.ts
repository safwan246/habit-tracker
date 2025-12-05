
import mongoose, { Schema, model, models, Document, Model, Types } from "mongoose";


export type CheckInStatus = "SUCCESS" | "FAILED" | "SKIP";

export interface ICheckIn {
  userId: Types.ObjectId | string;
  habitId: Types.ObjectId | string;
  status: CheckInStatus;
  note?: string;
  date: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICheckInDoc extends ICheckIn, Document {}

const CheckInSchema = new Schema<ICheckInDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "SKIP"],
      required: true,
    },
    note: { type: String },
    date: { type: String, required: true }, 
  },
  { timestamps: true }
);


CheckInSchema.index({ habitId: 1, date: 1 }, { unique: true });

const CheckIn: Model<ICheckInDoc> =
  (models.CheckIn as Model<ICheckInDoc>) || model<ICheckInDoc>("CheckIn", CheckInSchema);

export default CheckIn;

export type CreateCheckInInput = {
  habitId: string;
  status: CheckInStatus;
  note?: string;
  date?: string; 
};
