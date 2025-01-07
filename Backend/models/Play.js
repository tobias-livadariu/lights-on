const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
   username: { type: String, required: true },
   score: { type: Number, required: true },
   date: { type: Date, required: true },
   boardSize: { type: Number, required: true },
});

module.exports = mongoose.model("Play", playSchema);
