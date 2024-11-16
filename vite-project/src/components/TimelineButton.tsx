import { MouseEvent, ReactNode } from "react";

interface TimelineButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  color: string;
  type: "submit" | "reset" | "button" | undefined;
  children?: ReactNode;
}

const TimelineButton = ({
  onClick,
  color,
  type,
  children,
}: TimelineButtonProps) => {
  return (
    <div className="flex items-center gap-1">
      <button
        type={type}
        onClick={onClick}
        className={`h-4 w-4 rounded-full bg-${color}-300 hover:bg-${color}-200 border-2 border-zinc-700 hover:cursor-pointer`}
      ></button>
      <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
        {children}
      </p>
    </div>
  );
};

export default TimelineButton;
