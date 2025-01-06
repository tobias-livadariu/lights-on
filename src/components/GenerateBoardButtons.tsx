interface GenerateBoardButtonsProps {
   onGenerate: (size: number) => void;
}

const GenerateBoardButtons = ({ onGenerate }: GenerateBoardButtonsProps) => {
   const sizes = [3, 5, 7, 9];
   return (
      <div id="generate_board">
         <h2 className="light_blue" id="generate_text">
            Generate a board!
         </h2>
         {sizes.map((size) => (
            <button key={size} onClick={() => onGenerate(size)}>
               {size}x{size}
            </button>
         ))}
      </div>
   );
};

export default GenerateBoardButtons;
