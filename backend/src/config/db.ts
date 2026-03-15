import { Sequelize } from "sequelize";
import { env } from "./env";

const commonOptions = {
  dialect: "postgres" as const,
  logging: false,
  dialectOptions:
    env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : undefined,
};

const sequelize = env.DATABASE_URL
  ? new Sequelize(env.DATABASE_URL, commonOptions)
  : new Sequelize(env.DB_NAME!, env.DB_USER!, env.DB_PASSWORD!, {
      host: env.DB_HOST,
      port: env.DB_PORT,
      ...commonOptions,
    });

export default sequelize;
