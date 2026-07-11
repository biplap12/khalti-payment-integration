import express from "express";
import { initiateKhalti, verifyKhalti } from "../controllers/khaltiController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/initiate", protect, initiateKhalti);
router.post("/verify", protect, verifyKhalti);

export default router;
