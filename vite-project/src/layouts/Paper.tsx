import { ReactNode } from "react";
import Header2 from "../components/Header2";

interface PaperProps {
  onClick: () => void;
  title: string;
  children: ReactNode;
  bgColor: string;
  activeNavLink: string;
  list: string;
}

const Paper = ({
  onClick,
  title,
  children,
  bgColor,
  activeNavLink,
  list,
}: PaperProps) => {
  return (
    <div
      className={`${
        activeNavLink === list ? "w-96" : "w-64 opacity-70"
      } ${bgColor} p-4 rounded-2xl`}
      onClick={onClick}
    >
      <Header2 title={title} />
      <ol>{children}</ol>
    </div>
  );
};

export default Paper;
