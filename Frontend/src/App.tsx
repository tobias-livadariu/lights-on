// Import components for different sections of the app
import TitleSection from "./components/TitleSection";
import Rules from "./components/Rules";
import Board from "./components/Board";
import GenerateBoardButtons from "./components/GenerateBoardButtons";
import GameStats from "./components/GameStats";
import SubmitBoard from "./components/SubmitBoard";
import VictoryMessage from "./components/VictoryMessage";

// Import React hooks for state management and side effects
import { useState, useEffect } from "react";

// The main App component handles the game's logic and layout
const App = () => {
   // State variables to manage the game's state
   const [boardSize, setBoardSize] = useState<number | null>(null); // Size of the game board
   const [board, setBoard] = useState<string[][]>([]); // Current state of the board
   const [moveCount, setMoveCount] = useState(0); // Number of moves made
   const [gameStatus, setGameStatus] = useState<string | null>(null); // Game status ("win", "lose", or null)
   const [startTime, setStartTime] = useState<number | null>(null); // Start time of the game
   const [elapsedTime, setElapsedTime] = useState<number>(0); // Elapsed time in seconds

   // Effect to track and update elapsed time
   useEffect(() => {
      let timer: number | null = null;

      if (startTime !== null && gameStatus !== "win") {
         // Start an interval to update elapsed time every second
         timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
         }, 1000);
      }

      return () => {
         // Cleanup the interval on unmount or when the game resets
         if (timer) clearInterval(timer);
      };
   }, [startTime, gameStatus]);

   // Function to generate a new game board of the given size
   const generateBoard = (size: number) => {
      setBoardSize(size);
      setMoveCount(0);
      setElapsedTime(0);
      setStartTime(null);
      setBoard(
         Array.from(
            { length: size },
            () => Array.from({ length: size }, () => "off") // Initialize all cells to "off"
         )
      );
      setGameStatus(null);
   };

   // Function to toggle the state of a button and its adjacent buttons
   const toggleButtonState = (x: number, y: number) => {
      if (!boardSize) return;

      if (startTime === null) {
         setStartTime(Date.now()); // Start the timer on the first move
      }

      // Create a new board with toggled states
      const newBoard = board.map((row, i) =>
         row.map((cell, j) => {
            if (
               (i === x && j === y) || // Current button
               (i === x && Math.abs(j - y) === 1) || // Adjacent horizontal buttons
               (j === y && Math.abs(i - x) === 1) // Adjacent vertical buttons
            ) {
               return cell === "on" ? "off" : "on"; // Toggle state
            }
            return cell; // Leave other buttons unchanged
         })
      );

      setBoard(newBoard);
      setMoveCount((prev) => prev + 1); // Increment move count
   };

   // Function to reset the board to its initial state
   const resetBoard = () => {
      if (!boardSize) return;
      setMoveCount(0);
      setElapsedTime(0);
      setStartTime(null);
      setBoard(
         Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => "off")
         )
      );
   };

   // Function to check if the player has won the game
   const checkWinCondition = () => {
      if (board.every((row) => row.every((cell) => cell === "on"))) {
         setGameStatus("win"); // All buttons are "on" => player wins
      } else {
         setGameStatus("lose"); // Not all buttons are "on" => player loses
      }
   };

   // Function to reset the entire game
   const resetGame = () => {
      setBoardSize(null);
      setBoard([]);
      setMoveCount(0);
      setGameStatus(null);
      setElapsedTime(0);
      setStartTime(null);
   };

   return (
      <div className="app">
         {/* Title section of the app */}
         <TitleSection />
         <main>
            {/* Game rules */}
            <Rules />
            {!boardSize ? (
               // Show board size generation buttons if no board is set
               <GenerateBoardButtons onGenerate={generateBoard} />
            ) : (
               <>
                  {/* Render the game board */}
                  <Board
                     board={board}
                     onToggle={toggleButtonState}
                     disabled={gameStatus === "win"} // Disable the board if the player wins
                  />
                  {/* Display game stats and submit button if the player hasn't won yet */}
                  {gameStatus !== "win" && (
                     <>
                        <GameStats
                           moveCount={moveCount}
                           elapsedTime={elapsedTime}
                           onResetBoard={resetBoard}
                        />
                        <SubmitBoard checkWinCondition={checkWinCondition} />
                     </>
                  )}
                  {/* Display the victory or loss message */}
                  <VictoryMessage
                     gameStatus={gameStatus}
                     boardSize={boardSize}
                     moveCount={moveCount}
                     onReset={resetGame}
                     elapsedTime={elapsedTime}
                  />
               </>
            )}
         </main>
      </div>
   );
};

export default App; // Export the App component as the default export
