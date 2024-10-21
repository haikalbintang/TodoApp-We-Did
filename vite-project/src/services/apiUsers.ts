import { SignUpCredentials, LoginCredentials } from "../types";
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

export async function userLogin(LoginCredentials: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword(
    LoginCredentials
  );

  if (error) {
    console.error(error);
    throw new Error(error.message);
  } else {
    console.log("User login:", data);
    return data;
  }
}
