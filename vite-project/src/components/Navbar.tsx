import { ReactNode, useEffect, useState } from "react";
import { userLogout } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Logo from "./Logo";

interface NavbarProps {
  children?: ReactNode;
  selectedNavLink: string;
  setSelectedNavLink: (navLink: string) => void;
}

export default function Navbar({
  children,
  selectedNavLink,
  setSelectedNavLink,
}: NavbarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setIsAuthenticated(!!data.session);
      }
    };
    fetchSession();
  }, []);

  function handleLogout() {
    userLogout();
    navigate("/");
  }

  return (
    <div className="w-full h-[124px] shadow-xl">
      <nav className="xl:flex-col mx-auto w-full h-16 xl:h-[100px] max-w-[1366px] flex items-center xl:gap-2 justify-between p-5 xl:pb-3 xl:pt-3">
        <div className="relative items-center gap-4 flex w-full py-3">
          <div className="w-1/3"></div>
          <div className="w-1/3">
            <Logo />
          </div>
          <div className="flex items-center w-1/3 justify-end">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="bg-fuchsia-900 text-fuchsia-200 py-2 px-4 text-base rounded-full"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <ul className="flex gap-10 w-3/4 xl:w-full items-center justify-center xl:justify-between">
          <li className="w-1/5 text-center">
            <button
              onClick={() => setSelectedNavLink("backlog")}
              className={`${
                selectedNavLink === "backlog"
                  ? "pb-1 border-b-4 border-teal-600"
                  : ""
              } pb-1 border-b-4  text-gray-400 text-lg font-bold tracking-wider`}
            >
              backlog
            </button>
          </li>
          <li className="w-1/5 text-center">
            <button
              onClick={() => setSelectedNavLink("daily")}
              className={`${
                selectedNavLink === "daily"
                  ? "pb-1 border-b-4 border-teal-600"
                  : ""
              } pb-1 border-b-4  text-emerald-300 text-lg font-bold tracking-wider`}
            >
              daily
            </button>
          </li>
          <li className="w-1/5 text-center">
            <button
              onClick={() => setSelectedNavLink("today")}
              className={`${
                selectedNavLink === "today"
                  ? "pb-1 border-b-4 border-teal-600"
                  : ""
              } pb-1 border-b-4 text-sky-300 text-lg font-bold tracking-wider`}
            >
              today
            </button>
          </li>
          <li className="w-1/5 text-center">
            <button
              onClick={() => setSelectedNavLink("later")}
              className={`${
                selectedNavLink === "later" ? "border-teal-600" : ""
              } pb-1 border-b-4 text-orange-300 text-lg font-bold tracking-wider`}
            >
              later
            </button>
          </li>
          <li className="w-1/5 text-center">
            <button
              onClick={() => setSelectedNavLink("done")}
              className={`${
                selectedNavLink === "done" ? "border-teal-600" : ""
              } pb-1 border-b-4 text-red-400 text-lg font-bold tracking-wider`}
            >
              done
            </button>
          </li>
        </ul>

        <div className="flex justify-end">{children}</div>
      </nav>
    </div>
  );
}
