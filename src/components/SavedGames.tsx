// Import required hooks and libraries for form handling and validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the properties (props) for the SavedGames component
interface SavedGamesProps {
   boardSize: number | null; // The size of the game board (null if not initialized)
   moveCount: number; // Number of moves made by the player
   elapsedTime: number; // Elapsed time in seconds
}

// Define a schema for username validation using Zod
const schema = z.object({
   username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }), // Username must be at least 3 characters long
});

// Infer the form data type from the schema
type FormData = z.infer<typeof schema>;

// The SavedGames component displays game stats, top scores, and a form to save scores
const SavedGames = ({ boardSize, moveCount, elapsedTime }: SavedGamesProps) => {
   // Initialize the React Hook Form with Zod validation
   const {
      register, // Register input fields with the form
      handleSubmit, // Handle form submission
      formState: { errors }, // Access form validation errors
   } = useForm<FormData>({ resolver: zodResolver(schema) });

   // Function to handle form submission
   const onSubmit = (data: FormData) => {
      console.log(data.username); // Log the username to the console (placeholder functionality)
   };

   // If boardSize is null, do not render anything
   if (!boardSize) return null;

   return (
      // Container for saved games and stats
      <div id="saved_games">
         {/* Divider above the top scores */}
         <hr id="upper_saved_games_hr" />

         {/* Title for the top scores section */}
         <h1 id="top_scores_title">
            Top Scores for {boardSize}x{boardSize}:
         </h1>

         {/* List of placeholder top scores */}
         <ol id="top_scored_list">
            <li>Player1 - (TBD) moves</li>
            <li>Player2 - (TBD) moves</li>
            <li>Player3 - (TBD) moves</li>
         </ol>

         {/* Divider below the top scores */}
         <hr id="upper_saved_games_hr" className="reversed_hr" />

         {/* Player's current stats */}
         <h1 id="stats_title">Your Stats</h1>
         <h2 id="score_text">
            Score: {3 * moveCount + elapsedTime} Total Points{" "}
            {/* Calculate score */}
         </h2>
         <h2 id="rank_text">
            <span className="vibrant_orange">Rank: No.(TBD) Globally</span>
         </h2>

         {/* Form to save the player's score */}
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="styled_form">
               {/* Label for the username input */}
               <label htmlFor="username" className="form-label">
                  Enter your username:
               </label>

               {/* Input field for the username */}
               <input
                  {...register("username")} // Register input field for validation
                  id="username"
                  type="text"
                  className="form-control"
               />

               {/* Display validation error for username */}
               {errors.username && (
                  <div id="warning_text_container">
                     <p className="text_danger">{errors.username.message}</p>
                  </div>
               )}

               {/* Button to submit the form */}
               <button type="submit">Save Score</button>
            </div>
         </form>
      </div>
   );
};

export default SavedGames; // Export the SavedGames component as the default export
