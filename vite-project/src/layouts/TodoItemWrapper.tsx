import { ReactNode } from "react";

interface Data {
  status: string;
}

interface TodoItemWrapperProps {
  index: number;
  descIsShown: boolean;
  selectedBgColor: string;
  data: Data;
  children: ReactNode;
}

const TodoItemWrapper = ({
  index,
  descIsShown,
  selectedBgColor,
  data,
  children,
}: TodoItemWrapperProps) => {
  return (
    <li
      key={index}
      className={`${
        descIsShown ? selectedBgColor : ""
      } py-3 border-b border-zinc-700 hover:${selectedBgColor} px-2 hover:cursor-pointer ${
        data.status === "done" ? "text-zinc-500" : ""
      }`}
    >
      {children}
    </li>
  );
};

export default TodoItemWrapper;
