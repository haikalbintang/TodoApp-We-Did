import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className="h-fit flex flex-col xl:grid xl:grid-cols-5 xl:gap-6 w-max overflow-x-auto justify-center pt-6 pb-0 gap-4">
      {children}
    </main>
  );
};

export default Main;
