import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app: Express = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from frontend
      credentials: true, // Allow cookies to be sent
    })
  );

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

sequelize
    .sync()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Error connecting to database: ", err));

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));