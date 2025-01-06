interface BoardButtonProps {
   state: string;
   onClick: () => void;
   disabled: boolean;
}

const BoardButton = ({ state, onClick, disabled }: BoardButtonProps) => {
   return (
      <button className={state} onClick={onClick} disabled={disabled}></button>
   );
};

export default BoardButton;
