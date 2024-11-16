import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  selectedNavLink: string;
  setSelectedNavLink: (navLink: string) => void;
  onClickWelcome: () => void;
}

export default function Navbar({
  children,
  selectedNavLink,
  setSelectedNavLink,
  onClickWelcome,
}: NavbarProps) {
  return (
    <div className="w-full shadow-xl">
      <nav className="xl:flex-col mx-auto w-full h-16 xl:h-[100px] max-w-[1366px] flex items-center xl:gap-2 justify-between p-5 xl:pb-3 xl:pt-3">
        <div className="relative items-center gap-4 flex">
          <h1 className="hidden xl:block pb-2 ml-4 xl:ml-0 text-4xl font-bold text-teal-600 items-center">
            TodoApp
          </h1>
          <div>
            <div
              onClick={onClickWelcome}
              className="-rotate-[16deg] -top-6 w-12 ml-2 bg-zinc-300 rounded-lg"
            >
              <img
                className="transform rotate-[16deg] p-1"
                src="/check-icon-big.png"
                alt="check icon"
              />
            </div>
            <div className="-z-10 absolute -rotate-[36deg] left-[170px] xl:left-[i84px] top-0 w-12 h-12 ml-2 bg-teal-200 rounded-lg"></div>
          </div>
        </div>

        <ul className="flex gap-10 w-3/4 xl:w-full items-center justify-center xl:justify-between">
          <li className="w-1/3 text-center">
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
          <li className="w-1/3 text-center">
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
          <li className="w-1/3 text-center">
            <button
              onClick={() => setSelectedNavLink("later")}
              className={`${
                selectedNavLink === "later" ? "border-teal-600" : ""
              } pb-1 border-b-4 text-orange-300 text-lg font-bold tracking-wider`}
            >
              later
            </button>
          </li>
        </ul>

        <div className="flex justify-end">{children}</div>
      </nav>
    </div>
  );
}
