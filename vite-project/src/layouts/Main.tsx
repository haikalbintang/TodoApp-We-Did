import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  return (
    <main className="h-fit flex flex-col xl:flex-row justify-center pt-6 pb-0 gap-4">
      {children}
    </main>
  );
};

export default Main;
