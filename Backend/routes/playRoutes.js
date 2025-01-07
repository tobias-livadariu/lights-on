const express = require("express");
const {
   getTopPlays,
   savePlay,
   getUserRank,
} = require("../controllers/playController");

const router = express.Router();

// Route for fetching top plays
router.get("/top-plays", getTopPlays);

// Route for saving a play
router.post("/save-score", savePlay);

// Route for getting user rank
router.post("/user-rank", getUserRank);

module.exports = router;
