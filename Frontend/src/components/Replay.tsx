// Define the properties (props) for the Replay component
interface ReplayProps {
   onReset: () => void; // Function to handle resetting the game and starting a new one
}

// The Replay component provides a button for restarting the game
const Replay = ({ onReset }: ReplayProps) => {
   return (
      // Container for the replay button
      <div id="replay">
         {/* Button to trigger the onReset function */}
         <button
            id="replay_submit" // Assign a unique ID for styling
            onClick={onReset} // Call the onReset function when the button is clicked
         >
            Play Again! {/* Display text prompting the user to replay */}
         </button>
      </div>
   );
};

export default Replay; // Export the Replay component as the default export
