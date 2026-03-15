"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_1 = require("./env");
const commonOptions = {
    dialect: "postgres",
    logging: false,
    dialectOptions: env_1.env.NODE_ENV === "production"
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : undefined,
};
const sequelize = env_1.env.DATABASE_URL
    ? new sequelize_1.Sequelize(env_1.env.DATABASE_URL, commonOptions)
    : new sequelize_1.Sequelize(env_1.env.DB_NAME, env_1.env.DB_USER, env_1.env.DB_PASSWORD, {
        host: env_1.env.DB_HOST,
        port: env_1.env.DB_PORT,
        ...commonOptions,
    });
exports.default = sequelize;
