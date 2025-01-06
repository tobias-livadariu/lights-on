import TitleSection from "./components/TitleSection";
import Rules from "./components/Rules";
import Board from "./components/Board";
import GenerateBoardButtons from "./components/GenerateBoardButtons";
import GameStats from "./components/GameStats";
import SubmitBoard from "./components/SubmitBoard";
import VictoryMessage from "./components/VictoryMessage";
import { useState, useEffect } from "react";

const App = () => {
   const [boardSize, setBoardSize] = useState<number | null>(null);
   const [board, setBoard] = useState<string[][]>([]);
   const [moveCount, setMoveCount] = useState(0);
   const [gameStatus, setGameStatus] = useState<string | null>(null);
   const [startTime, setStartTime] = useState<number | null>(null);
   const [elapsedTime, setElapsedTime] = useState<number>(0);

   useEffect(() => {
      let timer: number | null = null;

      if (startTime !== null && gameStatus !== "win") {
         timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
         }, 1000);
      }

      return () => {
         if (timer) clearInterval(timer); // Cleanup the interval on unmount or game reset
      };
   }, [startTime, gameStatus]);

   const generateBoard = (size: number) => {
      setBoardSize(size);
      setMoveCount(0);
      setElapsedTime(0);
      setStartTime(null);
      setBoard(
         Array.from({ length: size }, () =>
            Array.from({ length: size }, () => "off")
         )
      );
      setGameStatus(null);
   };

   const toggleButtonState = (x: number, y: number) => {
      if (!boardSize) return;

      if (startTime === null) {
         setStartTime(Date.now());
      }

      const newBoard = board.map((row, i) =>
         row.map((cell, j) => {
            if (
               (i === x && j === y) ||
               (i === x && Math.abs(j - y) === 1) ||
               (j === y && Math.abs(i - x) === 1)
            ) {
               return cell === "on" ? "off" : "on";
            }
            return cell;
         })
      );

      setBoard(newBoard);
      setMoveCount((prev) => prev + 1);
   };

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

   const checkWinCondition = () => {
      if (board.every((row) => row.every((cell) => cell === "on"))) {
         setGameStatus("win");
      } else {
         setGameStatus("lose");
      }
   };

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
         <TitleSection />
         <main>
            <Rules />
            {!boardSize ? (
               <GenerateBoardButtons onGenerate={generateBoard} />
            ) : (
               <>
                  <Board
                     board={board}
                     onToggle={toggleButtonState}
                     disabled={gameStatus === "win"}
                  />
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

export default App;
