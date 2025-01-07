// Define the properties (props) for the SubmitBoard component
interface SubmitBoardProps {
   checkWinCondition: () => void; // Function to check if the current board satisfies the win condition
}

// The SubmitBoard component provides a button to submit the board for win condition validation
const SubmitBoard = ({ checkWinCondition }: SubmitBoardProps) => {
   return (
      // Container for the submit button
      <div id="submit_board">
         {/* Button to trigger the win condition check */}
         <button
            id="submit_board_button" // Unique ID for styling
            onClick={checkWinCondition} // Call the checkWinCondition function when the button is clicked
         >
            Submit Board! {/* Display text for the button */}
         </button>
      </div>
   );
};

export default SubmitBoard; // Export the SubmitBoard component as the default export
