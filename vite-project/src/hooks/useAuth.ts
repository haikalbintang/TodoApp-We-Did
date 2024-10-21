import { useState } from "react";
import { LoginCredentials, SignUpCredentials } from "../types";
import { userLogin, userSignUp } from "../services/apiUsers";

function useAuth() {
  const [loginIsShown, setLoginIsShown] = useState(true);
  const [signUpIsShown, setSignUpIsShown] = useState(false);

  async function handleLogin(loginData: LoginCredentials) {
    await userLogin(loginData);
    console.log(loginData);

    setLoginIsShown(false);
  }

  async function handleSignUp(signUpCredentials: SignUpCredentials) {
    await userSignUp(signUpCredentials);
    console.log(signUpCredentials);

    setSignUpIsShown(false);
  }

  return {
    loginIsShown,
    signUpIsShown,
    setLoginIsShown,
    setSignUpIsShown,
    handleLogin,
    handleSignUp,
  };
}

export default useAuth;
