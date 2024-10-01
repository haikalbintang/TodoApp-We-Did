import { CreateItem } from "../types";
import supabase from "./supabase";

export async function getTodos() {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todo items could not be loaded");
  }

  return data;
}

export async function createTodo(newTodo: CreateItem) {
  const { data, error } = await supabase
    .from("todos")
    .insert([newTodo])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo item could not be created");
  } else {
    console.log("Todo created:", data);
    return data;
  }
}

export async function deleteTodo(id: number) {
  const response = await supabase.from("todos").delete().eq("id", id);

  console.log(response);
}

export async function updateTodo(id: number) {
  const { data, error } = await supabase
    .from("todos")
    .update({
      address: {
        street: "Melrose Place",
        postcode: 90210,
      },
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Todo items could not be loaded");
  }

  return data;
}
