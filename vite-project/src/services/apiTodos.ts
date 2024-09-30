import { Item } from "../types";
import supabase from "./supabase";

export async function getTodos() {
  const { data, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error(error);
    throw new Error("Todo items could not be loaded");
  }

  return data;
}

export async function createTodo(todo: Item) {
  const { data, error } = await supabase
    .from("todos")
    .insert([todo])
    .select();

    if (error) {
      console.error(error);
      throw new Error("Todo item could not be created");
    }

    console.log(data)
}
