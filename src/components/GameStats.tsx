import ResetBoardButton from "./ResetBoardButton";

interface GameStatsProps {
   moveCount: number;
   elapsedTime: number;
   onResetBoard: () => void;
}

const GameStats = ({
   moveCount,
   elapsedTime,
   onResetBoard,
}: GameStatsProps) => {
   return (
      <div id="game_stats">
         <h3 id="num_clicks_text">Number of moves: {moveCount}</h3>
         <h3 id="time_taken_text" className="vibrant_orange">
            Time elapsed: {elapsedTime} seconds
         </h3>
         <ResetBoardButton onResetBoard={onResetBoard} />
      </div>
   );
};

export default GameStats;
