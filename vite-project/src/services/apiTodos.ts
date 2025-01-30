import { CreateItem, GetItem } from "../types";
import supabase from "./supabase";

export async function getBacklogTodos() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .eq("time", 0);

  if (error) {
    console.error(error);
    throw new Error("Backlog todo items could not be loaded");
  }

  return data;
}

export async function getPastTodos() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .eq("time", 1);

  if (error) {
    console.error(error);
    throw new Error("Past todo items could not be loaded");
  }

  return data;
}

export async function getPresentTodos() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .eq("time", 2);

  if (error) {
    console.error(error);
    throw new Error("Present todo items could not be loaded");
  }

  return data;
}

export async function getFutureTodos() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .eq("time", 3);

  if (error) {
    console.error(error);
    throw new Error("Future todo items could not be loaded");
  }

  return data;
}

export async function getDoneTodos() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("User ID not found");
  }

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId)
    .eq("time", 4);

  if (error) {
    console.error(error);
    throw new Error("Future todo items could not be loaded");
  }

  return data;
}

export async function deleteTodo(id: number) {
  await supabase.from("todos").delete().eq("id", id);
}

export async function updateTodo(
  id: number,
  updatedTodo: CreateItem
): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update(updatedTodo)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateTodoToPast(
  id: number,
  order: number
): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 1, order: order })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateTodoToPresent(
  id: number,
  order: number
): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 2, order: order })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateTodoToFuture(
  id: number,
  order: number
): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 3, order: order })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

// export async function updateItemPosition(id: number, newStatus: string) {
//   try {
//     if (newStatus === "past") {
//       await updateTodoToPast(id);
//     } else if (newStatus === "present") {
//       await updateTodoToPresent(id);
//     } else if (newStatus === "future") {
//       await updateTodoToFuture(id);
//     }
//   } catch (error) {
//     console.error("Failed to update item position:", error);
//   }
// }
