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
  onBacklogClick: (id: number) => Promise<void>;
  onDoneClick: (id: number) => Promise<void>;
  list: "backlog" | "daily" | "today" | "later" | "done";
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
  onBacklogClick,
  onDoneClick,
  list,
}: TodoItemProps) {
  const [descIsShown, setDescIsShown] = useState(false);

  function handleToBacklog(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onBacklogClick(data.id);
  }

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

  function handleToDone(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onDoneClick(data.id);
  }

  return (
    <TodoItemWrapper
      index={index}
      descIsShown={descIsShown}
      selectedBgColor={selectedBgColor}
      data={data}
    >
      <div
        className="flex justify-between hover:cursor-pointer group"
        onClick={() => setDescIsShown((prev) => !prev)}
      >
        <DisplayTodoItem data={data} />

        <div className="hidden gap-1 items-start mt-1 group-hover:flex z-20">
          {list != "backlog" && (
            <TimelineButton
              type="button"
              color="gray"
              onClick={handleToBacklog}
            />
          )}
          {list != "daily" && (
            <TimelineButton
              type="button"
              color="emerald"
              onClick={handleToPast}
            />
          )}
          {list != "today" && (
            <TimelineButton
              type="button"
              color="sky"
              onClick={handleToPresent}
            />
          )}
          {list != "later" && (
            <TimelineButton
              type="button"
              color="orange"
              onClick={handleToFuture}
            />
          )}
          {list != "done" && (
            <TimelineButton type="button" color="red" onClick={handleToDone} />
          )}
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
