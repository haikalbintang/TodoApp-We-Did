import { FormEvent } from "react";
import { Item } from "../types";
import TodoItem from "./TodoItem";
import Paper from "./Paper";

export interface ListProps {
  data: Item[];
  title: string;
  onClick: () => void;
  onAddItem: (e: FormEvent<Element>) => void;
  currentTodoItem: string
}

const List = ({
  data,
  title,
  onClick,
}: ListProps) => {


  return (
    <Paper onClick={onClick} title={title}>
      <ol>
        {data.map((data, index) => (
          <TodoItem key={data.title} data={data} index={index} />
        ))}
      </ol>  
    </Paper>
  );
};

export default List;
