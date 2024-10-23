import { CreateItemAutoOrder } from "../types";
import supabase from "./supabase";

export async function createTodo(newTodo: CreateItemAutoOrder) {
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
    throw new Error("Failed to fetch session");
  }

  const session = data.session;

  if (!session) {
    console.error("No active session found. Please log in.");
    throw new Error("User is not logged in");
  }

  const user = session.user;

  const { data: insertedTodo, error } = await supabase
    .from("todos")
    .insert({ ...newTodo, user_id: user.id })
    .select();

  if (error) {
    console.error("Error creating todo:", error);
    throw new Error("Todo item could not be created");
  }
  return insertedTodo;
}
