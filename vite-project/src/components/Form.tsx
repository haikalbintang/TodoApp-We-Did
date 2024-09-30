import Overlay from "./Overlay";
import Header2 from "./Header2";
import { useState } from "react";

interface FormProps {
  onClose: () => void;
}

const Form = ({ onClose }: FormProps) => {
    const [currentTodoItem, setCurrentTodoItem] = useState(second)

   function handleSubmit() {}
  return (
    <Overlay onClose={onClose}>
      <div className="p-40 fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50">
        <Header2 title="New To-do" />
        <form onSubmit={handleSubmit} action="">
          <input type="text" value={inputValue} onChange={onChange} />
          <button type="submit">Add</button>
        </form>
      </div>
    </Overlay>
  );
};

export default Form;
