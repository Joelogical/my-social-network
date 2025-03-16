import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err: Error) => console.error("MongoDB connection error:", err));

export default mongoose.connection;
