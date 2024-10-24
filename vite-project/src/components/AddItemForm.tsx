import Overlay from "../layouts/Overlay";
import Header2 from "./Header2";
import { useEffect, useState } from "react";
import { CreateItem, GetItem } from "../types";
import InputText from "./InputText";
import Modal from "../layouts/Modal";
import SubmitBtn from "./SubmitBtn";
import AddDescBtn from "./AddDescBtn";
import Form from "../layouts/Form";
import TimelineButton from "./TimelineButton";
import InputTextDesc from "./InputTextDesc";

interface AddItemFormProps {
  onClose: () => void;
  onSubmit: (newTodo: CreateItem) => void;
  initialData: GetItem | null;
}

const getColorByTime = (time: number): string => {
  switch (time) {
    case 1:
      return "emerald";
    case 2:
      return "sky";
    case 3:
      return "orange";
    default:
      return "orange"; // Default color if no match
  }
};

const AddItemForm = ({ onClose, onSubmit, initialData }: AddItemFormProps) => {
  const [currentTodoItem, setCurrentTodoItem] = useState<CreateItem>({
    title: "",
    subtitle: "",
    descriptions: [""],
    status: "progress",
    priority: "high",
    time: 3,
  });
  const [colorByTime, setColorByTime] = useState("orange");

  const resetForm = () => {
    setCurrentTodoItem({
      title: "",
      subtitle: "",
      descriptions: [""],
      status: "progress",
      priority: "high",
      time: 3,
    });
    setColorByTime("orange");
  };

  useEffect(() => {
    if (initialData) {
      setCurrentTodoItem(initialData);
      setColorByTime(getColorByTime(initialData.time));
    } else {
      resetForm();
    }
  }, [initialData]);

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

  const handleTimeSelection = (color: string, time: number) => {
    setColorByTime(color);
    setCurrentTodoItem((prev) => ({ ...prev, time: time }));
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(currentTodoItem);

    resetForm();
    onClose();
    // window.location.reload();
  }

  return (
    <Overlay onClose={onClose}>
      <Modal>
        <Header2 title="New Todo" />
        <Form onSubmit={handleSubmit}>
          <InputText
            label="Title:"
            name="title"
            value={currentTodoItem["title"]}
            type="text"
            color={colorByTime}
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
            type="text"
            color={colorByTime}
            onChange={(e) =>
              setCurrentTodoItem((prev) => ({
                ...prev,
                subtitle: e.target.value,
              }))
            }
          />
          <InputTextDesc
            label={
              currentTodoItem.descriptions.length > 1
                ? `Descriptions`
                : "Description"
            }
            name={`description`}
            color={colorByTime}
          >
            {currentTodoItem.descriptions.map((description, index) => (
              <div className="flex gap-2 w-full" key={index}>
                <p className="text-xl">•</p>
                <input
                  id={description}
                  name={`description-${index}`}
                  type="text"
                  value={description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="text-sm ring border-2 border-zinc-800 py-1 px-2 rounded-lg w-full flex flex-wrap"
                />
              </div>
            ))}
          </InputTextDesc>

          <div className="flex items-center justify-between">
            <AddDescBtn onAddDescription={addDescription} color={colorByTime} />
            <div className="flex gap-2 pr-4 pb-3">
              <TimelineButton
                color="emerald"
                type="button"
                onClick={() => handleTimeSelection("emerald", 1)}
              />
              <TimelineButton
                color="sky"
                type="button"
                onClick={() => handleTimeSelection("sky", 2)}
              />
              <TimelineButton
                color="orange"
                type="button"
                onClick={() => handleTimeSelection("orange", 3)}
              />
            </div>
          </div>

          <SubmitBtn />
        </Form>
      </Modal>
    </Overlay>
  );
};

export default AddItemForm;
