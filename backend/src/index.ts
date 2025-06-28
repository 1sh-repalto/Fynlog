import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import transactionRouter from "./routes/transactionRoutes";
import budgetRouter from "./routes/budgetRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { env } from "./config/env";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
  })
);

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
