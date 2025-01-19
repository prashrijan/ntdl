import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      require: true,
    },
    time: {
      type: Number,
      require: true,
    },
    isGood: {
      type: Boolean,
      default: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const TasksModel = new mongoose.model("Tasks", tasksSchema);
