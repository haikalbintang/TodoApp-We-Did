import { SignUpCredentials, LoginCredentials } from "../types";
import supabase from "./supabase";

export async function userSignUp(SignUpCredentials: SignUpCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email: SignUpCredentials.email,
    password: SignUpCredentials.password,
  });

  if (error) {
    console.error("Error during sign up:", error);
    return { error };
  }

  const userId = data.user?.id;

  const { error: profileError } = await supabase.from("profiles").insert([
    {
      id: userId,
      nickname: SignUpCredentials.nickname,
      username: SignUpCredentials.username,
      email: SignUpCredentials.email,
    },
  ]);

  if (profileError) {
    console.error("Error adding profile:", profileError);
    return { error: profileError };
  }
  return { data: data.user };
}

export async function userLogin(LoginCredentials: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword(
    LoginCredentials
  );

  if (error) {
    return { error };
  } else {
    const userId = data.user.id;
    localStorage.setItem("userId", userId);
    return { data };
  }
}

export async function userLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    return { error };
  } else {
    localStorage.removeItem("userId");
    return { success: true };
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

