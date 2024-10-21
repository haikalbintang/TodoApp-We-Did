import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [currentLogin, setCurrentLogin] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const loginData = currentLogin;
    handleLogin(loginData);
  }
  return (
    <Overlay onClose={() => navigate("/")}>
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
