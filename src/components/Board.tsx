import BoardButton from "./BoardButton";

interface BoardProps {
   board: string[][]; // 2D array for board representation
   onToggle: (x: number, y: number) => void;
   disabled: boolean;
}

const Board = ({ board, onToggle, disabled }: BoardProps) => {
   const numColumns = board[0].length; // Dynamically determine number of columns
   const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${numColumns}, 80px)`, // Dynamic grid columns
      gap: "4px", // Equal spacing for rows and columns
      justifyContent: "center",
      alignItems: "center",
   };

   return (
      <div id="board" style={gridStyle}>
         {board.flat().map((cell, index) => (
            <BoardButton
               key={index}
               state={cell}
               onClick={() =>
                  onToggle(Math.floor(index / numColumns), index % numColumns)
               }
               disabled={disabled}
            />
         ))}
      </div>
   );
};

export default Board;
