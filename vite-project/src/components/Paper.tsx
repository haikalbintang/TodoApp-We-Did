import { ReactNode } from "react";
import Header2 from "./Header2";

interface PaperProps {
  onClick: () => void;
  title: string;
  children: ReactNode;
  bgColor: string;
}

const Paper = ({ onClick, title, children, bgColor }: PaperProps) => {
  return (
    <div className={`w-1/3 ${bgColor} p-5 rounded-2xl`} onClick={onClick}>
      <Header2 title={title} />
      {children}
    </div>
  );
};

export default Paper;

// {selectedNavLink === "present" ? (
//     <Paper onClick={() => setSelectedNavLink("present")} title={"Main"}>
//       <ol>
//         {mainDataSeed.map((data, index) => (
//           <TodoItem key={data.title} data={data} index={index} />
//         ))}
//       </ol>
//     </Paper>
//   ) : null}
