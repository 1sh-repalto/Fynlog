"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionStatus = exports.logout = exports.validate = exports.refreshToken = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const errorHandler_1 = require("../middlewares/errorHandler");
const jwt_1 = require("../utils/jwt");
const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
};
// Sign Up
const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existing = await user_1.default.findOne({ where: { email } });
        if (existing)
            throw new errorHandler_1.AppError("Email already in use", 409);
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await user_1.default.create({ name, email, password: hashed });
        const accessToken = (0, jwt_1.generateAccessToken)(user.id, user.email);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id, user.email);
        res
            .cookie("accessToken", accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(201)
            .json({ id: user.id, name, email, createdAt: user.createdAt });
    }
    catch (err) {
        next(err);
    }
};
exports.signup = signup;
// Login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            throw new errorHandler_1.AppError("Invalid credentials", 401);
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user.id, user.email);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user.id, user.email);
        res
            .cookie("accessToken", accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
// Refresh Token
const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.status(403).json({ message: "No refresh token" });
            return;
        }
        const payload = (0, jwt_1.verifyRefreshToken)(token);
        if (!payload)
            throw new errorHandler_1.AppError("Invalid refresh token", 403);
        const newAccessToken = (0, jwt_1.generateAccessToken)(payload.userId, payload.email);
        res.cookie("accessToken", newAccessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 15 * 60 * 1000,
        });
        res.sendStatus(200);
    }
    catch (err) {
        next(err);
    }
};
exports.refreshToken = refreshToken;
// Validate
const validate = async (req, res) => {
    const user = await user_1.default.findOne({
        where: { id: req.user.userId },
        attributes: ["id", "name", "email", "createdAt"], // select only required fields
    });
    if (!user) {
        throw new errorHandler_1.AppError("User not found while validating", 401);
    }
    res.status(200).json(user);
};
exports.validate = validate;
// Logout
const logout = async (_, res) => {
    res
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .sendStatus(200);
};
exports.logout = logout;
const sessionStatus = async (req, res) => {
    if (req.cookies?.refreshToken) {
        return res.json({ hasSession: true });
    }
    res.json({ hasSession: false });
};
exports.sessionStatus = sessionStatus;
