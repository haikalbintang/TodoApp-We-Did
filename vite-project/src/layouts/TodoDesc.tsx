import { ReactNode } from "react";

interface Data {
  descriptions: string[];
  subtitle: string;
}

interface TodoDescProps {
  data: Data;
  children: ReactNode;
}

const TodoDesc = ({ data, children }: TodoDescProps) => {
  return (
    <div className="relative pl-5 hover:cursor-default overflow-x-clip">
      <ul>
        {data.descriptions?.map((description: string, index: number) =>
          description !== "" ? (
            <li className="list-disc mt-1 text-sm" key={index}>
              {description}
            </li>
          ) : null
        )}
      </ul>
      {data.subtitle === "" ? <div className="h-5"></div> : null}
      {children}
    </div>
  );
};

export default TodoDesc;
