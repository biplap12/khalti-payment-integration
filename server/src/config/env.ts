import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();

const schema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default("7d"),
  KHALTI_SECRET_KEY: Joi.string().required(),
  RETURN_URL: Joi.string().uri().required(),
  WEBSITE_URL: Joi.string().uri().required(),
  CORS_ORIGIN: Joi.string().required(),
  COOKIE_SECURE: Joi.boolean().default(false),
  KHALTI_BASE_URL: Joi.string().uri().required(),
  NODE_ENV: Joi.string()
    .valid("development", "production")
    .default("development"),
}).unknown();

const { error, value: env } = schema.validate(process.env);

if (error) {
  console.error("Config validation error:", error.message);
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: Number(env.PORT),
  mongoURI: env.MONGO_URI as string,
  jwtSecret: env.JWT_SECRET as string,
  jwtExpiresIn: env.JWT_EXPIRES_IN as string,
  khaltiBaseUrl: env.KHALTI_BASE_URL as string,
  khaltiSecret: env.KHALTI_SECRET_KEY as string,
  returnUrl: env.RETURN_URL as string,
  websiteUrl: env.WEBSITE_URL as string,
  corsOrigin: env.CORS_ORIGIN as string,
  cookieSecure: env.COOKIE_SECURE === "true" || env.COOKIE_SECURE === true,
  nodeEnv: env.NODE_ENV as string,
};
