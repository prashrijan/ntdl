import express from "express";
import "dotenv/config";
import taskRouter from "./src/routers/taskRouter.js";
import morgan from "morgan";
import { dbConnection } from "./src/config/dbConfig.js";

const app = express();

const PORT = process.env.PORT;

dbConnection();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
