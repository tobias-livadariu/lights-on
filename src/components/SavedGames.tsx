import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const SavedGames = ({ boardSize, moveCount, elapsedTime }: SavedGamesProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema) });

   const onSubmit = (data: FormData) => {
      console.log(data.username);
   };

   if (!boardSize) return null;

   return (
      <div id="saved_games">
         <hr id="upper_saved_games_hr" />
         <h1 id="top_scores_title">
            Top Scores for {boardSize}x{boardSize}:
         </h1>
         <ol id="top_scored_list">
            <li>Player1 - (TBD) moves</li>
            <li>Player2 - (TBD) moves</li>
            <li>Player3 - (TBD) moves</li>
         </ol>
         <hr id="upper_saved_games_hr" className="reversed_hr" />
         <h1 id="stats_title">Your Stats</h1>
         <h2 id="score_text">
            Score: {3 * moveCount + elapsedTime} Total Points
         </h2>
         <h2 id="rank_text">
            <span className="vibrant_orange">Rank: No.(TDB) Globally</span>
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
            </div>
         </form>
      </div>
   );
};

export default SavedGames;
