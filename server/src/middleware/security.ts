import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { config } from "../config/env";

export const securityMiddleware = (app: any) => {
  app.use(helmet());

  app.use(
    cors({
      origin: config.corsOrigin.split(","),
      credentials: true,
    }),
  );

  app.use(xss());
  app.use(mongoSanitize());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: "Too many requests from this IP, please try again later.",
  });

  app.use(limiter);
};
