import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conncection = await mongoose.connect(
      "mongodb://localhost:27017/ntdl-v2"
    );

    conncection && console.log("Database Conncection was successfully");
  } catch (error) {
    console.log(error);
  }
};
