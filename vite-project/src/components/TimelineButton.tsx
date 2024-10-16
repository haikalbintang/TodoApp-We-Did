import { MouseEvent } from "react";

interface TimelineButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  color: string;
}

const TimelineButton = ({ onClick, color }: TimelineButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-4 w-4 rounded-full bg-${color}-300 hover:bg-${color}-200 border-2 border-zinc-700 hover:cursor-pointer`}
    ></button>
  );
};

export default TimelineButton;
