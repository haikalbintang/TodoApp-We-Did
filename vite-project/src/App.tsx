import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getFutureTodos,
  getPastTodos,
  getPresentTodos,
  updateTodo,
  updateTodoToFuture,
  updateTodoToPast,
  updateTodoToPresent,
} from "./services/apiTodos";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Form from "./components/Form";
import { FaFeather } from "react-icons/fa6";
import { GetItem, CreateItem } from "./types";

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("present");
  const [pastData, setPastData] = useState<GetItem[]>([]);
  const [mainData, setMainData] = useState<GetItem[]>([]);
  const [futureData, setFutureData] = useState<GetItem[]>([]);
  const [formIsShown, setFormIsShown] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<GetItem | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const pastData = await getPastTodos();
    const mainData = await getPresentTodos();
    const futureData = await getFutureTodos();
    setPastData(pastData);
    setMainData(mainData);
    setFutureData(futureData);
  }

  async function handleAddTodo(newTodo: CreateItem) {
    if (todoToEdit) {
      const updatedTodo = await updateTodo(todoToEdit.id, newTodo);
      setPastData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setMainData((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setFutureData((prevData) =>
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

      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  function handleEditTodo(todo: GetItem) {
    setTodoToEdit(todo);
    setFormIsShown(true);
  }

  async function handleToPast(id: number) {
    try {
      await updateTodoToPast(id);

      const updatedTodo =
        mainData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToPresent(id: number) {
    try {
      await updateTodoToPresent(id);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToFuture(id: number) {
    try {
      await updateTodoToFuture(id);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        mainData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => [...prevData, updatedTodo]);
    } catch (error) {
      console.error("Failed to move todo", error);
    }
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
          <List
            title={"Daily Habit"}
            onClick={() => setSelectedNavLink("past")}
            data={pastData}
            bgColor="bg-emerald-300"
            selectedBgColor="bg-emerald-200"
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onPastClick={handleToPast}
            onPresentClick={handleToPresent}
            onFutureClick={handleToFuture}
          />

          <List
            title={"Today"}
            onClick={() => setSelectedNavLink("present")}
            data={mainData}
            bgColor="bg-sky-300"
            selectedBgColor="bg-sky-200"
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onPastClick={handleToPast}
            onPresentClick={handleToPresent}
            onFutureClick={handleToFuture}
          />

          <List
            title={"Todo List"}
            onClick={() => setSelectedNavLink("future")}
            data={futureData}
            bgColor="bg-orange-300"
            selectedBgColor="bg-orange-200"
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
            onPastClick={handleToPast}
            onPresentClick={handleToPresent}
            onFutureClick={handleToFuture}
          />
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
