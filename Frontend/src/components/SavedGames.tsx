import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

interface SavedGamesProps {
   boardSize: number | null;
   moveCount: number;
   elapsedTime: number;
}

const schema = z.object({
   username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
});

type FormData = z.infer<typeof schema>;

interface Play {
   username: string;
   score: number;
   date: string;
   boardSize: number;
}

const SavedGames = ({ boardSize, moveCount, elapsedTime }: SavedGamesProps) => {
   const [topPlays, setTopPlays] = useState<Play[]>([]);
   const [rank, setRank] = useState<number | null>(null);
   const [isSaved, setIsSaved] = useState(false);
   const [message, setMessage] = useState("");

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema) });

   const currentScore = 3 * moveCount + elapsedTime;

   useEffect(() => {
      if (boardSize) {
         // Fetch top plays for the current board size
         axios
            .get(`/lights-on/api/top-plays`, { params: { boardSize } })
            .then((response) => setTopPlays(response.data))
            .catch((error) =>
               console.error("Error fetching top plays:", error)
            );

         // Fetch rank for the current score
         axios
            .post(`/lights-on/api/user-rank`, { score: currentScore, boardSize })
            .then((response) => setRank(response.data.rank))
            .catch((error) => console.error("Error fetching rank:", error));
      }
   }, [boardSize, currentScore]);

   const onSubmit = (data: FormData) => {
      if (isSaved) {
         setMessage("You have already saved your score!");
         return;
      }

      const payload = {
         username: data.username,
         score: currentScore,
         date: new Date().toISOString(),
         boardSize,
      };

      axios
         .post(`/lights-on/api/save-score`, payload)
         .then(() => {
            setMessage("Saved!");
            setIsSaved(true);
         })
         .catch((error) => {
            console.error("Error saving score:", error);
            setMessage("Error saving score!");
         });
   };

   if (!boardSize) return null;

   return (
      <div id="saved_games">
         <hr id="upper_saved_games_hr" />
         <h1 id="top_scores_title">
            Top 3 Scores for {boardSize}x{boardSize}:
         </h1>
         <ol id="top_scored_list">
            {Array.from({ length: 3 }).map((_, index) => {
               const play = topPlays[index];
               return play ? (
                  <li key={index}>
                     {play.username} - {play.score} points (
                     {new Date(play.date).toLocaleDateString()})
                  </li>
               ) : (
                  <li key={index}>No data</li>
               );
            })}
         </ol>

         <hr id="upper_saved_games_hr" className="reversed_hr" />
         <h1 id="stats_title">Your Stats</h1>
         <h2 id="score_text">Score: {currentScore} Total Points</h2>
         <h2 id="rank_text">
            <span className="vibrant_orange">
               Rank: No.{rank !== null ? rank : "(TBD)"} Globally
            </span>
         </h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="styled_form">
               <label htmlFor="username" className="form-label">
                  Enter your username:
               </label>
               <input
                  {...register("username")}
                  id="username"
                  type="text"
                  className="form-control"
               />
               {errors.username && (
                  <div id="warning_text_container">
                     <p className="text_danger">{errors.username.message}</p>
                  </div>
               )}
               <button type="submit">Save Score</button>
               {message && <p>{message}</p>}
            </div>
         </form>
      </div>
   );
};

export default SavedGames;
