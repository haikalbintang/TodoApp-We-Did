import { useEffect, useState } from "react";
import { userLogout } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Logo from "./Logo";

interface NavbarProps {
  selectedNavLink: string;
  setSelectedNavLink: (navLink: string) => void;
  onHelpClick: () => void;
}

export default function Navbar({
  selectedNavLink,
  setSelectedNavLink,
  onHelpClick,
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
    localStorage.removeItem("hasSeenWelcomeMessage");
    navigate("/");
  }

  return (
    <>
      <nav className="xl:flex-col px-5 border-b-2 border-sky-100">
        <div
          className={`mx-auto max-w-[1366px] items-center gap-4 flex w-full py-3 transition-all duration-300`}
        >
          <div className="w-1/3"></div>
          <div className="w-1/3">
            <Logo />
          </div>
          <div className="flex items-center w-1/3 justify-end space-x-6">
            <p
              onClick={onHelpClick}
              className="hover:cursor-pointer text-fuchsia-900"
            >
              Help
            </p>
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
      </nav>
      <nav className="sticky top-0 w-full shadow-lg py-3 bg-white z-20">
        <div className="sticky top-0 w-full bg-white">
          <ul className="flex gap-10 w-3/4 xl:w-full items-center justify-center xl:justify-evenly">
            <li className="text-center">
              <button
                onClick={() => setSelectedNavLink("backlog")}
                className={`${
                  selectedNavLink === "backlog"
                    ? "pb-1 border-b-4 border-teal-600 border-opacity-100"
                    : ""
                } pb-1 border-b-4 border-opacity-0 text-gray-400 text-lg font-bold tracking-wider`}
              >
                backlog
              </button>
            </li>
            <li className="text-center">
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
            <li className="text-center">
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
            <li className="text-center">
              <button
                onClick={() => setSelectedNavLink("later")}
                className={`${
                  selectedNavLink === "later" ? "border-teal-600" : ""
                } pb-1 border-b-4 text-orange-300 text-lg font-bold tracking-wider`}
              >
                later
              </button>
            </li>
            <li className="text-center">
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
        </div>
      </nav>
    </>
  );
}
