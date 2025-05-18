import express from "express";
import {
  getLatestStats,
  getDeviation,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/stats", getLatestStats);
router.get("/deviation", getDeviation);

export default router;
