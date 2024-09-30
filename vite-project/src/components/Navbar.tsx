import { ReactNode } from "react";
import { navLinks } from "../data/dummyData";

interface NavbarProps {
  children: ReactNode;
  selectedNavLink: string;
  setSelectedNavLink: (navLink: string) => void;
}

export default function Navbar({
  children,
  selectedNavLink,
  setSelectedNavLink,
}: NavbarProps) {
  return (
    <div className="w-full shadow-xl">
      <nav className="mx-auto h-20 max-w-[1366px] flex items-center justify-between">
        <div className="flex w-1/3">
          <h1 className="pb-2 ml-4 text-5xl font-bold text-teal-600 flex items-center">
            To-do App
          </h1>
          <img
            className="w-16 ml-1"
            src="/check-icon-big.png"
            alt="check icon"
          />
        </div>
        <ul className="flex gap-11 w-1/3 items-center justify-center">
          {navLinks.map((navLink) => (
            <li key={navLink.name}>
              <button
                className={`text-xl
                    ${selectedNavLink === navLink.name ? "text-teal-500" : ""}
                  `}
                onClick={() => setSelectedNavLink(navLink.name)}
              >
                {navLink.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="w-1/3 flex justify-end">{children}</div>
      </nav>
    </div>
  );
}
