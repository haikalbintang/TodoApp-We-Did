import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userSignUp } from "../services/apiUsers";
import supabase from "../services/supabase";

interface ErrorRegister {
  nickname: null | string;
  username: null | string;
  email: null | string;
  password: null | string;
  submit: null | string;
}
const Register = () => {
  const [currentSignUp, setCurrentSignUp] = useState({
    nickname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<ErrorRegister>({
    nickname: null,
    username: null,
    email: null,
    password: null,
    submit: null,
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      errorMessage.email === null &&
      errorMessage.nickname === null &&
      errorMessage.password === null &&
      errorMessage.username === null
    ) {
      const { error, data } = await userSignUp(currentSignUp);

      if (error) {
        console.error(error);
        setErrorMessage((prev) => ({ ...prev, submit: error.message }));
      } else if (data) {
        navigate("/login");
      }
    }
  }

  function handleBlurNickname() {
    if (currentSignUp["nickname"].length < 1) {
      setErrorMessage((prev) => ({
        ...prev,
        nickname: "Nickname can not be blank.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, nickname: null }));
    }
  }

  function handleBlurUsername() {
    if (currentSignUp["username"].length < 4) {
      setErrorMessage((prev) => ({
        ...prev,
        username: "Username should be at least 4 characters.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, username: null }));
    }
  }

  async function handleBlurEmail(email: string) {
    setErrorMessage((prev) => ({
      ...prev,
      email: null,
    }));

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (data !== null) {
      setErrorMessage((prev) => ({
        ...prev,
        email: "Email has been registered",
      }));
    } else if (error) {
      console.error(error);
    }
  }
  function handleBlurPassword() {
    if (currentSignUp["password"].length < 6) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "Password should be at least 6 characters.",
      }));
    } else {
      setErrorMessage((prev) => ({ ...prev, password: null }));
    }
  }

  return (
    <Overlay onClose={() => navigate("/")}>
      <Modal>
        <Header2 title="Sign Up" />
        <form onSubmit={handleSubmit} action="">
          <div className="">
            <InputText
              label="Display Name:"
              name="nickname"
              value={currentSignUp["nickname"]}
              type="text"
              color="fuchsia"
              onBlur={handleBlurNickname}
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
            >
              {errorMessage.nickname && (
                <p className="text-fuchsia-600 text-sm ml-1">
                  {errorMessage.nickname}
                </p>
              )}
            </InputText>
            <InputText
              label="Username:"
              name="username"
              value={currentSignUp["username"]}
              type="text"
              color="fuchsia"
              onBlur={handleBlurUsername}
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            >
              {errorMessage.username && (
                <p className="text-teal-600 text-sm ml-1">
                  {errorMessage.username}
                </p>
              )}
            </InputText>

            <InputText
              label="Email:"
              name="emal"
              value={currentSignUp["email"]}
              type="email"
              color="fuchsia"
              onBlur={() => handleBlurEmail(currentSignUp.email)}
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            >
              {errorMessage.email && (
                <p className="text-fuchsia-600 text-sm ml-1">
                  {errorMessage.email}
                </p>
              )}
            </InputText>
            <InputText
              label="Password:"
              name="password"
              value={currentSignUp["password"]}
              type="password"
              color="fuchsia"
              onBlur={handleBlurPassword}
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            >
              {errorMessage.password && (
                <p className="text-fuchsia-600 text-sm ml-1">
                  {errorMessage.password}
                </p>
              )}
            </InputText>
          </div>

          {errorMessage.submit && (
            <p className="text-red-600 text-sm ml-4 mb-4">
              {errorMessage.submit}
            </p>
          )}

          <div className="flex py-2 items-center justify-end">
            <button
              className="ring py-2 px-4 bg-fuchsia-300 rounded-lg font-bold text-zinc-800 hover:bg-fuchsia-200"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </Modal>
    </Overlay>
  );
};

export default Register;
