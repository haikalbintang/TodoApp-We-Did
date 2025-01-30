import { useEffect, useState } from "react";
import { CreateItem, GetItem } from "../types";
import {
  deleteTodo,
  getBacklogTodos,
  getDoneTodos,
  getFutureTodos,
  getPastTodos,
  getPresentTodos,
  updateTodo,
  updateTodoToFuture,
  updateTodoToPast,
  updateTodoToPresent,
} from "../services/apiTodos";
import { createTodo } from "../services/apiCreateTodo";

function useTodos() {
  const [backlog, setBacklog] = useState<GetItem[]>([]);
  const [pastData, setPastData] = useState<GetItem[]>([]);
  const [mainData, setMainData] = useState<GetItem[]>([]);
  const [futureData, setFutureData] = useState<GetItem[]>([]);
  const [done, setDone] = useState<GetItem[]>([]);

  const [todoToEdit, setTodoToEdit] = useState<GetItem | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadTodos() {
      setIsLoading(true);
      await fetchTodos();
      setIsLoading(false);
    }

    loadTodos();
  }, []);

  async function fetchTodos() {
    try {
      const pastData = await getPastTodos();
      const mainData = await getPresentTodos();
      const futureData = await getFutureTodos();
      const backlogData = await getBacklogTodos();
      const doneData = await getDoneTodos();

      setPastData(pastData.sort((a, b) => a.order - b.order));
      setMainData(mainData.sort((a, b) => a.order - b.order));
      setFutureData(futureData.sort((a, b) => a.order - b.order));
      setBacklog(backlogData.sort((a, b) => a.order - b.order));
      setDone(doneData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }

  function handleDeleteTodo(id: number) {
    setTodoToDelete(id);
  }

  async function confirmDelete() {
    try {
      if (todoToDelete !== null) {
        await deleteTodo(todoToDelete);
      }
      setBacklog((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setPastData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setMainData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setFutureData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setDone((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  function handleEditTodo(todo: GetItem) {
    setTodoToEdit(todo);
  }

  async function handleAddTodo(newTodo: CreateItem) {
    if (todoToEdit) {
      const updatedTodo = await updateTodo(todoToEdit.id, newTodo);
      setBacklog((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
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
      setDone((prevData) =>
        prevData.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
      setTodoToEdit(null);
    } else
      switch (newTodo.time) {
        case 0:
          {
            const maxOrder =
              backlog.length > 0
                ? Math.max(...backlog.map((todo) => todo.order))
                : 0;
            const createdTodo = await createTodo({
              ...newTodo,
              order: maxOrder + 1,
            });
            setBacklog((prevData) =>
              [...prevData, createdTodo[0]].sort((a, b) => a.order - b.order)
            );
          }
          break;
        case 1:
          {
            const maxOrder =
              pastData.length > 0
                ? Math.max(...pastData.map((todo) => todo.order))
                : 0;
            const createdTodo = await createTodo({
              ...newTodo,
              order: maxOrder + 1,
            });
            setPastData((prevData) =>
              [...prevData, createdTodo[0]].sort((a, b) => a.order - b.order)
            );
          }
          break;
        case 2:
          {
            const maxOrder =
              mainData.length > 0
                ? Math.max(...mainData.map((todo) => todo.order))
                : 0;
            const createdTodo = await createTodo({
              ...newTodo,
              order: maxOrder + 1,
            });
            setMainData((prevData) =>
              [...prevData, createdTodo[0]].sort((a, b) => a.order - b.order)
            );
          }
          break;
        case 3:
          {
            const maxOrder =
              futureData.length > 0
                ? Math.max(...futureData.map((todo) => todo.order))
                : 0;
            const createdTodo = await createTodo({
              ...newTodo,
              order: maxOrder + 1,
            });
            setFutureData((prevData) =>
              [...prevData, createdTodo[0]].sort((a, b) => a.order - b.order)
            );
          }
          break;
        case 4:
          {
            const maxOrder =
              done.length > 0 ? Math.max(...done.map((todo) => todo.order)) : 0;
            const createdTodo = await createTodo({
              ...newTodo,
              order: maxOrder + 1,
            });
            setDone((prevData) =>
              [...prevData, createdTodo[0]].sort((a, b) => a.order - b.order)
            );
          }
          break;
        default:
          break;
      }
  }

  async function handleToBacklog(id: number) {
    try {
      const maxOrder =
        backlog.length > 0 ? Math.max(...backlog.map((todo) => todo.order)) : 0;

      await updateTodoToPast(id, maxOrder + 1);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        mainData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id) ||
        done.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setDone((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setBacklog((prevData) =>
        [...prevData, { ...updatedTodo, order: maxOrder + 1 }].sort(
          (a, b) => a.order - b.order
        )
      );
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToPast(id: number) {
    try {
      const maxOrder =
        pastData.length > 0
          ? Math.max(...pastData.map((todo) => todo.order))
          : 0;

      await updateTodoToPast(id, maxOrder + 1);

      const updatedTodo =
        mainData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id) ||
        done.find((todo) => todo.id === id) ||
        backlog.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setBacklog((prevData) => prevData.filter((todo) => todo.id !== id));
      setDone((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) =>
        [...prevData, { ...updatedTodo, order: maxOrder + 1 }].sort(
          (a, b) => a.order - b.order
        )
      );
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToPresent(id: number) {
    try {
      const maxOrder =
        mainData.length > 0
          ? Math.max(...mainData.map((todo) => todo.order))
          : 0;

      await updateTodoToPresent(id, maxOrder + 1);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id) ||
        done.find((todo) => todo.id === id) ||
        backlog.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setBacklog((prevData) => prevData.filter((todo) => todo.id !== id));
      setDone((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) =>
        [...prevData, { ...updatedTodo, order: maxOrder + 1 }].sort(
          (a, b) => a.order - b.order
        )
      );
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToFuture(id: number) {
    try {
      const maxOrder =
        futureData.length > 0
          ? Math.max(...futureData.map((todo) => todo.order))
          : 0;

      await updateTodoToFuture(id, maxOrder + 1);

      const updatedTodo =
        pastData.find((todo) => todo.id === id) ||
        mainData.find((todo) => todo.id === id) ||
        done.find((todo) => todo.id === id) ||
        backlog.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setBacklog((prevData) => prevData.filter((todo) => todo.id !== id));
      setDone((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) =>
        [...prevData, { ...updatedTodo, order: maxOrder + 1 }].sort(
          (a, b) => a.order - b.order
        )
      );
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  async function handleToDone(id: number) {
    try {
      const maxOrder =
        done.length > 0 ? Math.max(...done.map((todo) => todo.order)) : 0;

      await updateTodoToPast(id, maxOrder + 1);

      const updatedTodo =
        backlog.find((todo) => todo.id === id) ||
        pastData.find((todo) => todo.id === id) ||
        mainData.find((todo) => todo.id === id) ||
        futureData.find((todo) => todo.id === id);

      if (!updatedTodo) {
        throw new Error("Todo item not found");
      }

      setBacklog((prevData) => prevData.filter((todo) => todo.id !== id));
      setPastData((prevData) => prevData.filter((todo) => todo.id !== id));
      setMainData((prevData) => prevData.filter((todo) => todo.id !== id));
      setFutureData((prevData) => prevData.filter((todo) => todo.id !== id));
      setDone((prevData) =>
        [...prevData, { ...updatedTodo, order: maxOrder + 1 }].sort(
          (a, b) => a.order - b.order
        )
      );
    } catch (error) {
      console.error("Failed to move todo", error);
    }
  }

  return {
    isLoading,
    backlog,
    done,
    pastData,
    mainData,
    futureData,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToBacklog,
    handleToPast,
    handleToPresent,
    handleToFuture,
    handleToDone,
    confirmDelete,
    todoToEdit,
    todoToDelete,
    setTodoToEdit,
  };
}

export default useTodos;
