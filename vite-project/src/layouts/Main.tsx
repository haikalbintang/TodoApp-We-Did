import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className="h-fit flex flex-col xl:flex-row w-max overflow-x-auto justify-center pt-3 space-x-4 mx-auto">
      {children}
    </main>
  );
};

export default Main;
