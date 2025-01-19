import express from "express";
import "dotenv/config";
import taskRouter from "./src/routers/taskRouter.js";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
