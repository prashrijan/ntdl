import express from "express";
import { TasksModel } from "../models/taskModel.js";

const taskRouter = express.Router();

taskRouter.post("/", async (req, res, next) => {
  try {
    const tasks = await TasksModel(req.body).save();

    res.json({
      status: "success",
      message: "New task has been added successfully",
      tasks,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "errorr occurred while adding new task",
      error,
    });
  }
});

taskRouter.get("/", async (_, res, next) => {
  try {
    const tasks = await TasksModel.find();
    res.json({
      status: "success",
      message: "Tasks Lists",
      tasks,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Error getting tasks",
      error,
    });
  }
});

taskRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params?.id;
    const newData = req.body;

    const result = await TasksModel.findByIdAndUpdate(
      id,
      {
        $set: newData,
      },
      { new: true }
    );

    res.json({
      status: "success",
      message: "task updated successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "error updating task",
      error,
    });
  }
});

taskRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await TasksModel.findByIdAndDelete(id);

    res.json({
      status: "success",
      message: "task deleted successfully",
      result,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "error deleting task",
      error,
    });
  }
});

export default taskRouter;
