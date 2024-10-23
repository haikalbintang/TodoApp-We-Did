import { ReactNode } from "react";
import { navLinks } from "../data/dummyData";

interface NavbarProps {
  children: ReactNode;
  selectedNavLink: string;
  setSelectedNavLink: (navLink: string) => void;
  onClickLogin?: () => void;
}

export default function Navbar({
  children,
  selectedNavLink,
  setSelectedNavLink,
  onClickLogin,
}: NavbarProps) {
  return (
    <div className="w-full shadow-xl">
      <nav className="mx-auto w-full h-16 max-w-[1366px] flex items-center justify-between p-5">
        <div className="relative flex w-1/4">
          <h1 className="hidden pb-2 ml-4 text-4xl font-bold text-teal-600 items-center">
            TodoApp
          </h1>
          <div
            onClick={onClickLogin}
            className="absolute -rotate-[16deg] -top-6 w-12 ml-2 bg-zinc-300 rounded-lg"
          >
            <img
              className="transform rotate-[16deg] p-1"
              src="/check-icon-big.png"
              alt="check icon"
            />
          </div>
          <div className="-z-10 absolute -rotate-[36deg] -top-6 w-12 h-12 ml-2 bg-teal-200 rounded-lg"></div>
        </div>
        <ul className="flex gap-10 w-3/4 items-center justify-center">
          {navLinks.map((navLink) => (
            <li key={navLink.name} className={`w-1/3 ${navLink.textAlign}`}>
              <button
                className={`text-lg font-bold tracking-wider
                    ${
                      selectedNavLink === navLink.name
                        ? "text-teal-500"
                        : "text-zinc-700"
                    }
                  `}
                onClick={() => setSelectedNavLink(navLink.name)}
              >
                {navLink.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-end">{children}</div>
      </nav>
    </div>
  );
}
