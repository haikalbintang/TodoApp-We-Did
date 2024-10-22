import Overlay from "../layouts/Overlay";
import Header2 from "./Header2";
import { useEffect, useState } from "react";
import { CreateItem, GetItem } from "../types";
import InputText from "./InputText";
import Modal from "../layouts/Modal";
import SubmitBtn from "./SubmitBtn";
import AddDescBtn from "./AddDescBtn";
import Form from "../layouts/Form";

interface AddItemFormProps {
  onClose: () => void;
  onSubmit: (newTodo: CreateItem) => void;
  initialData: GetItem | null;
}

const AddItemForm = ({ onClose, onSubmit, initialData }: AddItemFormProps) => {
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
      setCurrentTodoItem(initialData);
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
      <Modal>
        <Header2 title="New Todo" />
        <Form onSubmit={handleSubmit}>
          <InputText
            label="Title:"
            name="title"
            value={currentTodoItem["title"]}
            type="text"
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
              label={`Desc ${index + 1}:`}
              name={`description-${index}`}
              value={description}
              type="text"
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
            />
          ))}
          <AddDescBtn onAddDescription={addDescription} />

          <SubmitBtn />
        </Form>
      </Modal>
    </Overlay>
  );
};

export default AddItemForm;
