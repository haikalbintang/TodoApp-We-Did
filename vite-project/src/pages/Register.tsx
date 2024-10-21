import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import { SignUpCredentials } from "../types";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onClose: () => void;
  onSubmit: (signUpCredentials: SignUpCredentials) => void;
}

const Register = ({ onClose, onSubmit }: RegisterProps) => {
  const [currentSignUp, setCurrentSignUp] = useState({
    nickname: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const signUpData = currentSignUp;
    console.log(signUpData);

    onSubmit(signUpData);

    setCurrentSignUp({ nickname: "", username: "", email: "", password: "" });
    onClose();
  }
  return (
    <Overlay onClose={() => navigate("/landing")}>
      <Modal>
        <Header2 title="Sign Up" />
        <form onSubmit={handleSubmit} action="">
          <div className="">
            <InputText
              label="Name:"
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
              onChange={(e) =>
                setCurrentSignUp((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
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
