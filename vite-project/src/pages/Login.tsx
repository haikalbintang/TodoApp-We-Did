import Modal from "../layouts/Modal";
import Overlay from "../layouts/Overlay";
import Header2 from "../components/Header2";
import InputText from "../components/InputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../services/apiUsers";
import supabase from "../services/supabase";
interface ErrorLogin {
  email: null | string;
  password: null | string;
  submit: null | string;
}
const Login = () => {
  const [currentLogin, setCurrentLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<ErrorLogin>({
    email: null,
    password: null,
    submit: null,
  });
  const navigate = useNavigate();

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

    if (error || data === null) {
      console.error(error);
      setErrorMessage((prev) => ({
        ...prev,
        email: "Email has not been registered",
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error, data } = await userLogin(currentLogin);

    if (error) {
      console.error(error);
      setErrorMessage((prev) => ({ ...prev, submit: "Invalid Credential" }));
    } else if (data) {
      navigate("/main");
    }
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
              onBlur={() => handleBlurEmail(currentLogin.email)}
              onChange={(e) =>
                setCurrentLogin((prev) => ({
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
              value={currentLogin["password"]}
              type="password"
              onChange={(e) =>
                setCurrentLogin((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            ></InputText>
          </div>

          {errorMessage.submit && (
            <p className="text-red-600 text-sm ml-4">{errorMessage.submit}</p>
          )}

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
