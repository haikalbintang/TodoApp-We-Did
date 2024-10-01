import Overlay from "./Overlay";
import Header2 from "./Header2";
import { useEffect, useState } from "react";
import { CreateItem, GetItem } from "../types";
import InputText from "./InputText";

interface FormProps {
  onClose: () => void;
  onSubmit: (newTodo: CreateItem) => void;
  initialData: GetItem|null
}

const Form = ({ onClose, onSubmit, initialData }: FormProps) => {
  const [currentTodoItem, setCurrentTodoItem] = useState<CreateItem>({
    title: "",
    subtitle: "",
    descriptions: [""],
    status: "progress",
    priority: "high",
    time: 2,
  });

  useEffect(() => {
    if (initialData) {
        setCurrentTodoItem(initialData)
    }
  }, [initialData])

  function addDescription() {
    setCurrentTodoItem((prev) => ({
      ...prev,
      descriptions: [...prev.descriptions, ""],
    }));
  }

  function handleDescriptionChange(index: number, value: string) {
    setCurrentTodoItem((prev) => ({
      ...prev,
      descriptions: prev.descriptions.map((desc, i) =>
        i === index ? value : desc
      ),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newItem: CreateItem = currentTodoItem;
    console.log(newItem);

    onSubmit(newItem);

    setCurrentTodoItem({
      title: "",
      subtitle: "",
      descriptions: [""],
      status: "progress",
      priority: "high",
      time: 2,
    });
    onClose();
    // window.location.reload();
  }

  return (
    <Overlay onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="py-10 px-10 fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50"
      >
        <div className="min-w-96">
          <Header2 title="New To-do" />
          <form onSubmit={handleSubmit} action="">
            <div className="">
              <InputText
                label="Title:"
                name="title"
                value={currentTodoItem["title"]}
                onChange={(e) =>
                  setCurrentTodoItem((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <InputText
                label="Subtitle:"
                name="subtitle"
                value={currentTodoItem["subtitle"]}
                onChange={(e) =>
                  setCurrentTodoItem((prev) => ({
                    ...prev,
                    subtitle: e.target.value,
                  }))
                }
              />
              {currentTodoItem.descriptions.map((description, index) => (
                <InputText
                  key={index}
                  label={`Description ${index + 1}:`}
                  name={`description-${index}`}
                  value={description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                />
              ))}
              <button
                type="button"
                onClick={addDescription}
                className="hover:cursor-pointer text-zinc-700 hover:text-zinc-800 flex max-w-[134px] gap-6 items-center justify-between px-2 py-2 my-3 bg-sky-200 hover:bg-sky-300 rounded-lg"
              >
                <p className="font-semibold">Add Description</p>
              </button>
            </div>

            <div className="flex items-center justify-end">
              <button
                className="ring py-2 px-4 bg-sky-300 rounded-lg font-bold text-zinc-800 hover:bg-sky-200"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default Form;
