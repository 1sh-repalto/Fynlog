import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app: Express = express();
app.use(express.json());

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