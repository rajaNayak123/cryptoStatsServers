const express = require("express");
const { getLatestStats, getDeviation } = require("../controllers/statsController.js");

const router = express.Router();

router.get("/stats", getLatestStats);
router.get("/deviation", getDeviation);

module.exports = router;

