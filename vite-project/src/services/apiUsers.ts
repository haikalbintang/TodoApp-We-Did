import { SignUpCredentials } from "../types";
import supabase from "./supabase";

export async function userSignUp(SignUpCredentials: SignUpCredentials) {
  const { data, error } = await supabase.auth.signUp(SignUpCredentials);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  } else {
    console.log("User created:", data);
    return data;
  }
}
