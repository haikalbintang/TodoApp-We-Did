import { useEffect, useState } from "react";
import { CreateItem, GetItem } from "../types";
import {
  deleteTodo,
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
  const [pastData, setPastData] = useState<GetItem[]>([]);
  const [mainData, setMainData] = useState<GetItem[]>([]);
  const [futureData, setFutureData] = useState<GetItem[]>([]);

  const [todoToEdit, setTodoToEdit] = useState<GetItem | null>(null);
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

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

  function handleDeleteTodo(id: number) {
    setTodoToDelete(id);
  }

  async function confirmDelete() {
    try {
      if (todoToDelete !== null) {
        await deleteTodo(todoToDelete);
      }

      setPastData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setMainData((prevData) =>
        prevData.filter((todo) => todo.id !== todoToDelete)
      );
      setFutureData((prevData) =>
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

  return {
    pastData,
    mainData,
    futureData,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToPast,
    handleToPresent,
    handleToFuture,
    confirmDelete,
    todoToEdit,
    todoToDelete,
  };
}

export default useTodos;