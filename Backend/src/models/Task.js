import mongoose from "mongoose";
import { getWeekRange } from "../utils/dateUtils.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is mandatory"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Date is mandatory"],
    },
    startTime: {
      type: String,
      trim: true,
      default: "",
    },
    endTime: {
      type: String,
      trim: true,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },
    weekStart: {
      type: Date,
    },
    weekEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to populate Monday-Sunday week bounds
taskSchema.pre("save", function () {
  if (this.isModified("date") || !this.weekStart) {
    const { weekStart, weekEnd } = getWeekRange(this.date);
    this.weekStart = weekStart;
    this.weekEnd = weekEnd;
  }
});

export const Task = mongoose.model("Task", taskSchema);

