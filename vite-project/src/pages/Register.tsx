import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userSignUp } from "../services/apiUsers";

interface ErrorRegister {
  nickname: null | string;
  username: null | string;
  email: null | string;
  password: null | string;
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
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage({
      nickname: null,
      username: null,
      email: null,
      password: null,
    });

    const { error, data } = await userSignUp(currentSignUp);

    if (error) {
      setErrorMessage((prev) => ({ ...prev, password: error.message })); // Fix later
      console.log("a", error);
      console.error("b", error);
    } else if (data) {
      navigate("/login");
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
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  nickname: e.target.value,
                }))
              }
            />
            <InputText
              label="Username:"
              name="username"
              value={currentSignUp["username"]}
              type="text"
              onBlur={handleBlurUsername}
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            >
              {errorMessage.username && (
                <p className="text-fuchsia-600 text-sm ml-1">
                  {errorMessage.username}
                </p>
              )}
            </InputText>

            <InputText
              label="Email:"
              name="emal"
              value={currentSignUp["email"]}
              type="email"
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <InputText
              label="Password:"
              name="password"
              value={currentSignUp["password"]}
              type="password"
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </div>

          {errorMessage.password && (
            <p className="text-red-600 text-sm ml-4 mb-4">
              {errorMessage.password}
            </p>
          )}

          <div className="flex items-center justify-end">
            <button
              className="ring py-2 px-4 bg-sky-300 rounded-lg font-bold text-zinc-800 hover:bg-sky-200"
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
