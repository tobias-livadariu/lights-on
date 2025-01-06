interface SubmitBoardProps {
   checkWinCondition: () => void;
}

const SubmitBoard = ({ checkWinCondition }: SubmitBoardProps) => {
   return (
      <div id="submit_board">
         <button id="submit_board_button" onClick={checkWinCondition}>
            Submit Board!
         </button>
      </div>
   );
};

export default SubmitBoard;
