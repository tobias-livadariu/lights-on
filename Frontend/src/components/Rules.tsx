// The Rules component displays instructions for the game
const Rules = () => {
   return (
      // Container for the game rules
      <div id="rules">
         {/* Rule explaining how button presses affect the board */}
         <h3>
            Pressing a button switches the state of all non-diagonal adjacent
            buttons.
         </h3>

         {/* Rule explaining the goal of the game */}
         <h3>Find a way to light them all up!</h3>
      </div>
   );
};

export default Rules; // Export the Rules component as the default export
