import express from "express";

const taskRouter = express.Router();

let fakeDB = [];


taskRouter.post("/", (req, res, next) => {
  fakeDB.push(req.body);
  console.log(fakeDB);
  res.json({
    status: "success",
    message: "New task has been added successfully",
  });
});

taskRouter.get("/", (_, res) => {
  res.json({
    status: "success",
    message: "Tasks Lists",
    tasks: fakeDB,
  });
});

taskRouter.put("/", (req, res) => {
  res.json({ task: "hello put" });
});

taskRouter.delete("/", (req, res) => {
  res.json({ task: "hello delete" });
});

export default taskRouter;
