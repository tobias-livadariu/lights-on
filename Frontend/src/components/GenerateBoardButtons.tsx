// Define the properties (props) for the GenerateBoardButtons component
interface GenerateBoardButtonsProps {
   onGenerate: (size: number) => void; // Function to handle generating a board of a specific size
}

// The GenerateBoardButtons component provides buttons to generate boards of different sizes
const GenerateBoardButtons = ({ onGenerate }: GenerateBoardButtonsProps) => {
   // Define the available board sizes
   const sizes = [3, 5, 7, 9];

   return (
      // Container for the generate board buttons
      <div id="generate_board">
         {/* Header text prompting the user to generate a board */}
         <h2 className="light_blue" id="generate_text">
            Generate a board!
         </h2>

         {/* Map over the sizes array to create a button for each board size */}
         {sizes.map((size) => (
            <button
               key={size} // Unique key for React to track the buttons
               onClick={() => onGenerate(size)} // Call the onGenerate function with the selected size
            >
               {size}x{size} {/* Display the size as "NxN" */}
            </button>
         ))}
      </div>
   );
};

export default GenerateBoardButtons; // Export the GenerateBoardButtons component as the default export
