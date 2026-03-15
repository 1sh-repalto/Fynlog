"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const budgetRoutes_1 = __importDefault(require("./routes/budgetRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const env_1 = require("./config/env");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
if (env_1.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}
const limiter = (0, express_rate_limit_1.default)({
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
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use(limiter);
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL, // Allow requests from frontend
    credentials: true, // Allow cookies to be sent
}));
// routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use("/api/transactions", transactionRoutes_1.default);
app.use("/api/budgets", budgetRoutes_1.default);
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
app.use(errorHandler_1.errorHandler);
// connect to database
db_1.default
    .sync()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Error connecting to database: ", err));
const PORT = env_1.env.PORT;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
