import Overlay from "../layouts/Overlay";
import { LoginCredentials } from "../types";
import Header2 from "./Header2";
import InputText from "./InputText";
import { useState } from "react";

interface LoginProps {
  onClose: () => void;
  onSubmit: (loginCredential: LoginCredentials) => void;
}

const Login = ({ onClose, onSubmit }: LoginProps) => {
  const [currentLogin, setCurrentLogin] = useState({ email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const loginData = currentLogin;
    console.log(loginData);

    onSubmit(loginData);

    setCurrentLogin({
      email: "",
      password: "",
    });
    onClose();
  }
  return (
    <Overlay onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="py-10 px-10 fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50"
      >
        <div className="min-w-96">
          <Header2 title="Login" />
          <form onSubmit={handleSubmit} action="">
            <div className="">
              <InputText
                label="Email:"
                name="emal"
                value={currentLogin["email"]}
                onChange={(e) =>
                  setCurrentLogin((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <InputText
                label="Password:"
                name="password"
                value={currentLogin["password"]}
                onChange={(e) =>
                  setCurrentLogin((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                className="ring py-2 px-4 bg-sky-300 rounded-lg font-bold text-zinc-800 hover:bg-sky-200"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
};

export default Login;
