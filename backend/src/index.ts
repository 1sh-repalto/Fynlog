import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
  })
);

// routes
app.use("/auth", authRouter);
app.use("/users", userRouter);

// global error handler
app.use(errorHandler);

// connect to database
sequelize
  .sync()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Error connecting to database: ", err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
