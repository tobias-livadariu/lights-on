const Play = require("../models/Play");
const Joi = require("joi");

const playSchema = Joi.object({
   username: Joi.string().min(3).required(),
   score: Joi.number().min(0).required(),
   date: Joi.date().required(),
   boardSize: Joi.number().min(1).required(),
});

// Fetch top plays
exports.getTopPlays = async (req, res, next) => {
   try {
      const { boardSize } = req.query;
      const plays = await Play.find({ boardSize })
         .sort({ score: 1, date: -1 })
         .limit(3);
      res.json(plays);
   } catch (error) {
      next(error); // Pass the error to the centralized middleware
   }
};

// Save a play with validation
exports.savePlay = async (req, res, next) => {
   const { error } = playSchema.validate(req.body);
   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   try {
      const { username, score, date, boardSize } = req.body;

      const existingPlay = await Play.findOne({ username, boardSize, score });
      if (existingPlay) {
         return res
            .status(400)
            .json({ message: "Score already saved for this game." });
      }

      const play = new Play({ username, score, date, boardSize });
      await play.save();
      res.status(201).json({ message: "Score saved!" });
   } catch (error) {
      next(error);
   }
};

// Get user rank
exports.getUserRank = async (req, res, next) => {
   try {
      const { score, boardSize } = req.body;
      const rank =
         (await Play.countDocuments({ boardSize, score: { $lt: score } })) + 1;
      res.json({ rank });
   } catch (error) {
      next(error);
   }
};
