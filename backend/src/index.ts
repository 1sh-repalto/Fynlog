import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelize from "./config/db";

dotenv.config();

const app: Express = express();

app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
});

sequelize
    .sync()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Error connecting to database: ", err));

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));