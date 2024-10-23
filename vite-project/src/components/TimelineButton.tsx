import { MouseEvent } from "react";

interface TimelineButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  color: string;
  type: "submit" | "reset" | "button" | undefined
}

const TimelineButton = ({ onClick, color, type }: TimelineButtonProps) => {
  return (
    <button type={type}
      onClick={onClick}
      className={`h-4 w-4 rounded-full bg-${color}-300 hover:bg-${color}-200 border-2 border-zinc-700 hover:cursor-pointer`}
    ></button>
  );
};

export default TimelineButton;
