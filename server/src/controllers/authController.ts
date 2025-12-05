import { Request, Response } from "express";
import User from "../models/User";
import { config } from "../config/env";
import jwt from "jsonwebtoken";

const createToken = (id: string, email: string) => {
  return jwt.sign({ id, email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body as {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already in use" });

  const user = await User.create({ name, email, phone, password });
  const token = createToken(user.id as string, user.email as string);
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: config.nodeEnv === "production" ? "strict" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    })
    .status(201)
    .json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
};

export const login = async (req: Request, res: Response) => {
  if (req.user) return res.status(400).json({ message: "Already logged in" });
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = createToken(user.id as string, user.email as string);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: config.nodeEnv === "production" ? "strict" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    .json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
};

export const me = async (req: Request, res: Response) => {
  if (!(req as any).user)
    return res.status(401).json({ message: "Not logged in" });
  const userId = (req as any).user.id as string;
  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
  });
};

export const logout = (req: Request, res: Response) => {
  if (!(req as any).user)
    return res.status(401).json({ message: "Not logged in" });
  res.clearCookie("token").json({ message: "Logged out" });
};
