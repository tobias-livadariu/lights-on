interface ResetBoardButtonProps {
   onResetBoard: () => void;
}

const ResetBoardButton = ({ onResetBoard }: ResetBoardButtonProps) => {
   return (
      <button id="reset_board_button" onClick={onResetBoard}>
         Reset Board
      </button>
   );
};

export default ResetBoardButton;
