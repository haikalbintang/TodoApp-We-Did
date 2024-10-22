import { SignUpCredentials, LoginCredentials } from "../types";
import supabase from "./supabase";

export async function userSignUp(SignUpCredentials: SignUpCredentials) {
  const { data, error } = await supabase.auth.signUp(SignUpCredentials);

  if (error) {
    console.error(error);
    return { error };
  } else {
    console.log("User created:", data);
    return { data };
  }
}

export async function userLogin(LoginCredentials: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword(
    LoginCredentials
  );

  if (error) {
    return {error};
  } else {
    console.log("User login:", data);
    return {data};
  }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error("Error sending password reset email:", error.message);
  } else {
    console.log("Password reset email sent:", data);
  }
}
