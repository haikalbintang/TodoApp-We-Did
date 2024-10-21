import { CreateItem } from "../types";
import supabase from "./supabase";

export async function createTodo(newTodo: CreateItem) {
  // Mendapatkan sesi autentikasi pengguna
  const { data, error: sessionError } = await supabase.auth.getSession();

  // Cek apakah ada error saat mengambil sesi
  if (sessionError) {
    console.error("Error fetching session:", sessionError);
    throw new Error("Failed to fetch session");
  }

  const session = data.session;

  // Cek apakah pengguna sudah login
  if (!session) {
    console.error("No active session found. Please log in.");
    throw new Error("User is not logged in");
  }

  const user = session.user;

  // Insert todo baru ke dalam tabel 'todos'
  const { data: insertedTodo, error } = await supabase
    .from("todos")
    .insert({ ...newTodo, user_id: user.id })
    .select(); // Pastikan select() untuk mendapatkan data setelah insert

  // Cek jika ada error pada proses insert
  if (error) {
    console.error("Error creating todo:", error);
    throw new Error("Todo item could not be created");
  }

  // Kembalikan data yang sudah diinsert jika berhasil
  console.log("Todo created:", insertedTodo);
  return insertedTodo;
}
