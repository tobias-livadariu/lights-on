import Replay from "./Replay";
import SavedGames from "./SavedGames";
import { useEffect, useState } from "react";

interface VictoryMessageProps {
   gameStatus: string | null;
   boardSize: number;
   moveCount: number;
   elapsedTime: number;
   onReset: () => void;
}

const VictoryMessage = ({
   gameStatus,
   boardSize,
   moveCount,
   elapsedTime,
   onReset,
}: VictoryMessageProps) => {
   const [showMessage, setShowMessage] = useState<boolean>(true);

   useEffect(() => {
      if (gameStatus === "lose") {
         setShowMessage(true); // Show the message initially
         const timer = setTimeout(() => {
            setShowMessage(false); // Hide the message after 5 seconds
         }, 5000);

         return () => clearTimeout(timer); // Cleanup the timer on unmount or when gameStatus changes
      }
   }, [gameStatus]);

   if (!gameStatus || (gameStatus === "lose" && !showMessage)) return null;

   return (
      <>
         <div id="confirmation_section">
            <h2 id="confirmation_text1" className={gameStatus}>
               {gameStatus === "win"
                  ? "You lit on all the buttons! Congratulations!"
                  : "You did not fill all the squares!"}
            </h2>
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
            )}{" "}
         </div>
         {gameStatus === "win" && <Replay onReset={onReset} />}
         {gameStatus === "win" && (
            <SavedGames
               boardSize={boardSize}
               moveCount={moveCount}
               elapsedTime={elapsedTime}
            />
         )}
      </>
   );
};

export default VictoryMessage;
