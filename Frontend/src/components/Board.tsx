// Import the BoardButton component, which represents a single cell on the board
import BoardButton from "./BoardButton";

// Define the properties (props) for the Board component
interface BoardProps {
   board: string[][]; // A 2D array representing the state of the board
   onToggle: (x: number, y: number) => void; // A function to handle toggling the state of a cell
   disabled: boolean; // A flag to indicate whether interactions with the board are disabled
}

// The Board component renders a dynamic grid of BoardButton components
const Board = ({ board, onToggle, disabled }: BoardProps) => {
   // Calculate the number of columns dynamically based on the first row of the board
   const numColumns = board[0].length;

   // Define the inline styles for the grid container
   const gridStyle = {
      display: "grid", // Use CSS grid for layout
      gridTemplateColumns: `repeat(${numColumns}, 80px)`, // Create a column for each board cell
      gap: "4px", // Add spacing between rows and columns
      justifyContent: "center", // Center the grid horizontally
      alignItems: "center", // Center the grid vertically
   };

   return (
      // Render the grid container with the calculated styles
      <div id="board" style={gridStyle}>
         {/* Flatten the 2D board array and map each cell to a BoardButton */}
         {board.flat().map((cell, index) => (
            <BoardButton
               key={index} // Use the index as the unique key for each button
               state={cell} // Pass the current cell's state as a prop
               onClick={() =>
                  onToggle(
                     Math.floor(index / numColumns), // Calculate the row index
                     index % numColumns // Calculate the column index
                  )
               }
               disabled={disabled} // Disable the button if the board is disabled
            />
         ))}
      </div>
   );
};

export default Board; // Export the Board component as the default export
