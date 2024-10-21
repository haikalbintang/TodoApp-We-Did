import { CreateItem, GetItem } from "../types";
import supabase from "./supabase";

export async function getPastTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("time", 1);

  if (error) {
    console.error(error);
    throw new Error("Past todo items could not be loaded");
  }

  return data;
}

export async function getPresentTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("time", 2);

  if (error) {
    console.error(error);
    throw new Error("Present todo items could not be loaded");
  }

  return data;
}

export async function getFutureTodos() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("time", 3);

  if (error) {
    console.error(error);
    throw new Error("Future todo items could not be loaded");
  }

  return data;
}

// export async function createTodo(newTodo: CreateItem) {
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (session) {
//     const user = session.user;

//     const { data, error } = await supabase
//       .from("todos")
//       .insert({ ...newTodo, user_id: user.id })
//       .select();

//     if (error) {
//       console.error(error);
//       throw new Error("Todo item could not be created");
//     } else {
//       console.log("Todo created:", data);
//       return data;
//     }
//   }
// }

export async function deleteTodo(id: number) {
  const response = await supabase.from("todos").delete().eq("id", id);

  console.log(response);
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

export async function updateTodoToPast(id: number): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 1 })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateTodoToPresent(id: number): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 2 })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateTodoToFuture(id: number): Promise<GetItem> {
  const { data, error } = await supabase
    .from("todos")
    .update({ time: 3 })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be updated");
  }

  return data[0];
}

export async function updateItemPosition(id: number, newStatus: string) {
  try {
    if (newStatus === "past") {
      await updateTodoToPast(id);
    } else if (newStatus === "present") {
      await updateTodoToPresent(id);
    } else if (newStatus === "future") {
      await updateTodoToFuture(id);
    }
  } catch (error) {
    console.error("Failed to update item position:", error);
  }
}
