// Define the properties (props) for the ResetBoardButton component
interface ResetBoardButtonProps {
   onResetBoard: () => void; // Function to reset the current state of the board
}

// The ResetBoardButton component provides a button to reset the board
const ResetBoardButton = ({ onResetBoard }: ResetBoardButtonProps) => {
   return (
      // Render the reset button with a unique ID for styling
      <button
         id="reset_board_button" // Assign a unique ID for custom CSS styling
         onClick={onResetBoard} // Trigger the onResetBoard function when clicked
      >
         Reset Board {/* Display text on the button */}
      </button>
   );
};

export default ResetBoardButton; // Export the ResetBoardButton component as the default export
