import { useState } from "react";
import { GetItem } from "../types";
import { ImCross } from "react-icons/im";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

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
  onFutureClick
}: TodoItemProps) {
  const [descIsShown, setDescIsShown] = useState(false);

  function handleToggleDesc() {
    setDescIsShown((prev) => !prev);
  }

  function handleDelete() {
    onDeleteTodo(data.id);
  }

  function handleEdit() {
    onEditTodo(data);
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



  return (
    <li
      key={index}
      className={`${
        descIsShown ? selectedBgColor : ""
      } py-1 hover:${selectedBgColor} px-2 my-2 hover:cursor-pointer ${
        data.status === "done" ? "text-zinc-500" : ""
      }`}
    >
      <div className="flex justify-between" onClick={handleToggleDesc}>
        <div>
          <h2 className="border-zinc-700 font-semibold">
            {index + 1}. {data.title}
          </h2>
          <h3>{data.subtitle}</h3>
        </div>
        <div className="flex gap-2 items-start mt-1">
          <button
            onClick={handleToPast}
            className="h-4 w-4 rounded-full bg-emerald-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"
          ></button>
          <button onClick={handleToPresent} className="h-4 w-4 rounded-full bg-yellow-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button onClick={handleToFuture} className="h-4 w-4 rounded-full bg-orange-400 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
        </div>
      </div>
      {descIsShown && (
        <div className="relative pl-5 hover:cursor-default overflow-x-clip">
          <ul>
            {data.descriptions?.map((description: string, index: number) => (
              <li className="list-disc mt-1 text-sm" key={index}>
                {description}
              </li>
            ))}
          </ul>
          <div
            title="close"
            onClick={() => setDescIsShown(false)}
            className="absolute text-sm -right-0.5 bottom-0.5 w-4 h-4 rounded-full text-red-800 cursor-pointer"
          >
            <ImCross />
          </div>
          <div
            title="delete"
            className="absolute text-sm right-5 bottom-0.5 w-4 h-4 rounded-full text-zinc-950 cursor-pointer"
            onClick={handleDelete}
          >
            <FaRegTrashAlt />
          </div>
          <div
            title="edit"
            className="absolute text-sm right-10 bottom-0.5 w-4 h-4 rounded-full text-zinc-950 cursor-pointer"
            onClick={handleEdit}
          >
            <FaPencil />
          </div>
        </div>
      )}
    </li>
  );
}
