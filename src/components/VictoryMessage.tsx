// Import Replay and SavedGames components for post-game actions
import Replay from "./Replay";
import SavedGames from "./SavedGames";
// Import React hooks for managing state and side effects
import { useEffect, useState } from "react";

// Define the properties (props) for the VictoryMessage component
interface VictoryMessageProps {
   gameStatus: string | null; // The current status of the game ("win", "lose", or null)
   boardSize: number; // The size of the board
   moveCount: number; // The number of moves made by the player
   elapsedTime: number; // The elapsed time in seconds
   onReset: () => void; // Function to reset the game
}

// The VictoryMessage component displays messages and options based on the game status
const VictoryMessage = ({
   gameStatus,
   boardSize,
   moveCount,
   elapsedTime,
   onReset,
}: VictoryMessageProps) => {
   // State to manage the visibility of the "lose" message
   const [showMessage, setShowMessage] = useState<boolean>(true);

   // Effect to auto-hide the "lose" message after 5 seconds
   useEffect(() => {
      if (gameStatus === "lose") {
         setShowMessage(true); // Show the message initially
         const timer = setTimeout(() => {
            setShowMessage(false); // Hide the message after 5 seconds
         }, 5000);

         return () => clearTimeout(timer); // Cleanup the timer on unmount or when gameStatus changes
      }
   }, [gameStatus]);

   // If there is no game status or the "lose" message timeout has expired, render nothing
   if (!gameStatus || (gameStatus === "lose" && !showMessage)) return null;

   return (
      <>
         {/* Main confirmation section for the victory or defeat message */}
         <div id="confirmation_section">
            {/* Message indicating the game result */}
            <h2 id="confirmation_text1" className={gameStatus}>
               {gameStatus === "win"
                  ? "You lit on all the buttons! Congratulations!"
                  : "You did not fill all the squares!"}
            </h2>

            {/* Additional message with game statistics */}
            <h2 id="confirmation_text2" className={gameStatus}>
               {gameStatus === "win" ? (
                  <>
                     You won in <span className="light_blue">{moveCount}</span>{" "}
                     moves and{" "}
                     <span className="vibrant_orange">{elapsedTime}</span>{" "}
                     seconds.
                  </>
               ) : (
                  "Try again!"
               )}
            </h2>

            {/* Scoring message displayed only when the player wins */}
            {gameStatus === "win" && (
               <h2 id="confirmation_text3" className={gameStatus}>
                  You scored{" "}
                  <span className="light_blue">
                     3x{moveCount}={3 * moveCount}
                  </span>{" "}
                  plus <span className="vibrant_orange">{elapsedTime}</span>{" "}
                  equals{" "}
                  <span className="light_green">
                     {3 * moveCount + elapsedTime}
                  </span>{" "}
                  total points.
               </h2>
            )}
         </div>

         {/* Replay button displayed when the player wins */}
         {gameStatus === "win" && <Replay onReset={onReset} />}

         {/* SavedGames component for saving scores, displayed when the player wins */}
         {gameStatus === "win" && (
            <SavedGames
               boardSize={boardSize} // Pass the board size
               moveCount={moveCount} // Pass the number of moves
               elapsedTime={elapsedTime} // Pass the elapsed time
            />
         )}
      </>
   );
};

export default VictoryMessage; // Export the VictoryMessage component as the default export
