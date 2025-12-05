import express from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/env";
import { connectDB } from "./config/database";
import authRoutes from "./routes/authRoutes";
import khaltiRoutes from "./routes/khaltiRoutes";
import { securityMiddleware } from "./middleware/security";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
securityMiddleware(app);

app.use("/api/auth", authRoutes);
app.use("/api/khalti", khaltiRoutes);

app.get("/", (req, res) => res.send("API running"));

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
