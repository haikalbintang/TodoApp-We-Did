import { useState } from "react";
import { GetItem } from "../types";
import { ImCross } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import DisplayTodoItem from "./DisplayTodoItem";
import TimelineButton from "./TimelineButton";
import TodoItemWrapper from "../layouts/TodoItemWrapper";
import TodoDesc from "../layouts/TodoDesc";

interface TodoItemProps {
  data: GetItem;
  index: number;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (data: GetItem) => void;
  selectedBgColor: string;
  onPastClick: (id: number) => Promise<void>;
  onPresentClick: (id: number) => Promise<void>;
  onFutureClick: (id: number) => Promise<void>;
}

export default function TodoItem({
  data,
  index,
  onDeleteTodo,
  onEditTodo,
  selectedBgColor,
  onPastClick,
  onPresentClick,
  onFutureClick,
}: TodoItemProps) {
  const [descIsShown, setDescIsShown] = useState(false);

  function handleToPast(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onPastClick(data.id);
  }

  function handleToPresent(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onPresentClick(data.id);
  }

  function handleToFuture(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onFutureClick(data.id);
  }

  return (
    <TodoItemWrapper
      index={index}
      descIsShown={descIsShown}
      selectedBgColor={selectedBgColor}
      data={data}
    >
      <div
        className="flex justify-between"
        onClick={() => setDescIsShown((prev) => !prev)}
      >
        <DisplayTodoItem data={data} />

        <div className="flex gap-2 items-start mt-1">
          <TimelineButton
            type="button"
            color="emerald"
            onClick={handleToPast}
          />
          <TimelineButton type="button" color="sky" onClick={handleToPresent} />
          <TimelineButton
            type="button"
            color="orange"
            onClick={handleToFuture}
          />
        </div>
      </div>
      {descIsShown && (
        <TodoDesc data={data}>
          <div
            title="close"
            onClick={() => setDescIsShown(false)}
            className="absolute text-base right-0 -bottom-1 w-4 h-4 rounded-full text-zinc-700 cursor-pointer"
          >
            <ImCross />
          </div>
          <div
            title="delete"
            className="absolute text-base right-6 -bottom-1 w-4 h-4 rounded-full text-red-800 cursor-pointer"
            onClick={() => onDeleteTodo(data.id)}
          >
            <FaRegTrashAlt />
          </div>
          <div
            title="edit"
            className="absolute text-base right-12 -bottom-1 w-4 h-4 rounded-full text-zinc-800 cursor-pointer"
            onClick={() => onEditTodo(data)}
          >
            <FaPencil />
          </div>
        </TodoDesc>
      )}
    </TodoItemWrapper>
  );
}
