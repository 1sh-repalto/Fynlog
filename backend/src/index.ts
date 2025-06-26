import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import transactionRouter from "./routes/transactionRoutes";
import budgetRouter from "./routes/budgetRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import Transaction from "./models/transaction";
import { env } from "./config/env";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";

const app: Express = express();
// const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// middleware
app.use(express.json());
app.use(cookieParser());
// app.use(limiter);
// app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
  })
);

// for dev use only - function to clear transactions
// async function clearTransactions() {
//   try {
//     await Transaction.destroy({ where: {} }); // deletes all rows
//     console.log("✅ All transactions deleted.");
//   } catch (error) {
//     console.error("❌ Error deleting transactions:", error);
//   }
// }

// clearTransactions();

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter)

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV,
  });
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "API route not found" });
});

// global error handler
app.use(errorHandler);

// connect to database
sequelize
  .sync()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Error connecting to database: ", err));

const PORT = env.PORT;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
