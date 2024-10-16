import Overlay from "../layouts/Overlay";
import { SignUpCredentials } from "../types";
import Header2 from "./Header2";
import InputText from "./InputText";
import { useState } from "react";

interface SignUpProps {
  onClose: () => void;
  onSubmit: (signUpCredentials: SignUpCredentials) => void;
}

const SignUp = ({ onClose, onSubmit }: SignUpProps) => {
  const [currentSignUp, setCurrentSignUp] = useState({
    nickname: "",
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const signUpData = currentSignUp;
    console.log(signUpData);

    onSubmit(signUpData);

    setCurrentSignUp({ nickname: "", username: "", email: "", password: "" });
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
                label="Name:"
                name="nickname"
                value={currentSignUp["nickname"]}
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
        </div>
      </div>
    </Overlay>
  );
};

export default SignUp;
