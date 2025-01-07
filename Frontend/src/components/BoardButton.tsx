// Define the properties (props) for the BoardButton component
interface BoardButtonProps {
   state: string; // Represents the state of the button (e.g., "on", "off")
   onClick: () => void; // Function to handle the button's click event
   disabled: boolean; // Determines if the button is disabled
}

// The BoardButton component represents a single button in the board
const BoardButton = ({ state, onClick, disabled }: BoardButtonProps) => {
   return (
      // Render a button element with dynamic class, click handler, and disabled state
      <button
         className={state} // Apply a class based on the state prop
         onClick={onClick} // Trigger the onClick function when the button is clicked
         disabled={disabled} // Disable the button if the disabled prop is true
      ></button>
   );
};

export default BoardButton; // Export the BoardButton component as the default export
