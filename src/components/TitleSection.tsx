// The TitleSection component renders the main title for the game
const TitleSection = () => {
   return (
      // Outer container for the title section
      <div>
         {/* Header element to semantically group the title */}
         <header>
            {/* Div for styling and structuring the title */}
            <div id="title_section">
               {/* Main title of the game */}
               <h1>Welcome to my Silly Button Game!</h1>
            </div>
         </header>
      </div>
   );
};

export default TitleSection; // Export the TitleSection component as the default export
