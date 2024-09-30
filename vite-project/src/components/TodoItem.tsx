import { useState } from "react";
import { Item } from "../types";
import { ImCross } from "react-icons/im";

interface TodoItemProps {
  data: Item;
  index: number;
}

export default function TodoItem({ data, index }: TodoItemProps) {
  const [descIsShown, setDescIsShown] = useState(false);

  function handleToggleDesc() {
    setDescIsShown((prev) => !prev);
  }
  return (
    <li
      key={index}
      className={`${
        descIsShown ? "bg-sky-200" : ""
      } py-1 hover:bg-sky-200 px-2 my-2 hover:cursor-pointer ${
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
        <div className="flex gap-2 items-start">
          <button className="h-4 w-4 rounded-full bg-emerald-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-yellow-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-orange-400 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
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
            onClick={() => setDescIsShown(false)}
            className="absolute text-xs -right-0.5 bottom-0.5 w-4 h-4 rounded-full text-red-800 cursor-pointer"
          >
            <ImCross />
          </div>
        </div>
      )}
    </li>
  );
}
