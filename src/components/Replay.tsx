interface ReplayProps {
   onReset: () => void;
}

const Replay = ({ onReset }: ReplayProps) => {
   return (
      <div id="replay">
         <button id="replay_submit" onClick={onReset}>
            Play Again!
         </button>
      </div>
   );
};

export default Replay;
