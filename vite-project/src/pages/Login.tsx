import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import { LoginCredentials } from "../types";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onSubmit }: LoginProps) => {
  const [currentLogin, setCurrentLogin] = useState({
    email: "superstarstark@gmail.com",
    password: "asdasd",
  });
  const navigate = useNavigate();

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
    <Overlay onClose={() => navigate("/landing")}>
      <Modal>
        <Header2 title="Login" />
        <form onSubmit={handleSubmit} action="">
          <div className="">
            <InputText
              label="Email:"
              name="emal"
              value={currentLogin["email"]}
              type="email"
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
              type="password"
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
      </Modal>
    </Overlay>
  );
};

export default Login;
