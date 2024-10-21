import { LoginCredentials, SignUpCredentials } from "../types";
import { userLogin, userSignUp } from "../services/apiUsers";

function useAuth() {
  async function handleLogin(loginData: LoginCredentials) {
    await userLogin(loginData);
    console.log(loginData);
  }

  async function handleSignUp(signUpCredentials: SignUpCredentials) {
    await userSignUp(signUpCredentials);
    console.log(signUpCredentials);
  }

  return {
    handleLogin,
    handleSignUp,
  };
}

export default useAuth;
