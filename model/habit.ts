import mongoose, {Schema, model, models, Document,Model,Types,} from "mongoose";


export type HabitCategory = "health" | "productivity" | "finance" | "social";
export type HabitFrequency = "daily" | "weekly" | "monthly";


export interface IHabit {
  id?: string;
  userId: Types.ObjectId | string;
  title: string;
  description?: string;
  category: HabitCategory;
  frequency: HabitFrequency;
  trigger?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IHabitDoc extends IHabit, Document {}


const HabitSchema = new Schema<IHabitDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["health", "productivity", "finance", "social"],
      required: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    trigger: { type: String }, 
  },
  { timestamps: true }
);


const Habit: Model<IHabitDoc> =
  (models.Habit as Model<IHabitDoc>) || model<IHabitDoc>("Habit", HabitSchema);

export default Habit;
