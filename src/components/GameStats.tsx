// Import the ResetBoardButton component to allow resetting the board
import ResetBoardButton from "./ResetBoardButton";

// Define the properties (props) for the GameStats component
interface GameStatsProps {
   moveCount: number; // The number of moves the player has made
   elapsedTime: number; // The elapsed time (in seconds) since the game started
   onResetBoard: () => void; // Function to reset the board
}

// The GameStats component displays game statistics and provides a reset button
const GameStats = ({
   moveCount,
   elapsedTime,
   onResetBoard,
}: GameStatsProps) => {
   return (
      // Container for game statistics
      <div id="game_stats">
         {/* Display the number of moves */}
         <h3 id="num_clicks_text">Number of moves: {moveCount}</h3>

         {/* Display the elapsed time with an additional CSS class for styling */}
         <h3 id="time_taken_text" className="vibrant_orange">
            Time elapsed: {elapsedTime} seconds
         </h3>

         {/* Render the ResetBoardButton to allow the user to reset the board */}
         <ResetBoardButton onResetBoard={onResetBoard} />
      </div>
   );
};

export default GameStats; // Export the GameStats component as the default export
