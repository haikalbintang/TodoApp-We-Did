import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./services/apiTodos";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Form from "./components/Form";
import { FaFeather } from "react-icons/fa6";
import { GetItem, CreateItem } from "./types";

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("present");
  const [mainData, setMainData] = useState<GetItem[]>([]);
  // const [futureData, setFutureData] = useState(futureDataSeed);
  const [formIsShown, setFormIsShown] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<GetItem | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const data = await getTodos();
    setMainData(data);
  }

  async function handleAddTodo(newTodo: CreateItem) {
    if (todoToEdit) {
      const updatedTodo = await updateTodo(todoToEdit.id, newTodo);
      setMainData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setTodoToEdit(null);
    } else {
      const createdTodo = await createTodo(newTodo);
      setMainData((prevData) => [...prevData, createdTodo[0]]);
    }
    setFormIsShown(false);
  }

  async function handleDeleteTodo(id: number) {
    try {
      await deleteTodo(id);

      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  function handleEditTodo(todo: GetItem) {
    setTodoToEdit(todo);
    setFormIsShown(true);
  }

  return (
    <div className="relative min-h-screen">
      <Navbar
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
      >
        <button className="bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-10">
          Profile
        </button>
      </Navbar>
      <div className="mx-auto max-w-[1366px]">
        <main className="h-fit flex justify-center pt-10 pb-0 gap-4">
          {selectedNavLink === "present" ? (
            <List
              title={"Main"}
              onClick={() => setSelectedNavLink("present")}
              data={mainData}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          ) : null}
          {selectedNavLink === "future" ? (
            <List
              title={"Future"}
              onClick={() => setSelectedNavLink("future")}
              data={mainData}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
            />
          ) : null}
        </main>
        <div
          onClick={() => {
            setFormIsShown(true);
            setTodoToEdit(null);
          }}
          className="fixed cursor-pointer bg-sky-300 p-5 rounded-full right-36 bottom-10 shadow-zinc-400 shadow-lg"
        >
          <FaFeather className="text-4xl" />
        </div>
      </div>
      {formIsShown && (
        <Form
          onClose={() => setFormIsShown(false)}
          onSubmit={handleAddTodo}
          initialData={todoToEdit}
        />
      )}
    </div>
  );
}

export default App;
