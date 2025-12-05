import express from "express";
import Joi from "joi";
import { register, login, logout, me } from "../controllers/authController";
import { validateBody } from "../middleware/validateRequest";
import { protect } from "../middleware/auth";

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // nepali number
  phone: Joi.string()
    .pattern(/^(97|98)[0-9]{8}$/)
    .messages({
      "string.pattern.base": "Invalid phone number.",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

export default router;
