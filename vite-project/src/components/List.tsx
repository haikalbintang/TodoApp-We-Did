import { GetItem } from "../types";
import TodoItem from "./TodoItem";
import Paper from "./Paper";

export interface ListProps {
  data: GetItem[];
  title: string;
  onClick: () => void;
  onDeleteTodo: (id: number) => void;
}

const List = ({ data, title, onClick, onDeleteTodo }: ListProps) => {
  return (
    <Paper onClick={onClick} title={title}>
      <ol>
        {data.map((data, index) => (
          <TodoItem
            key={data.title}
            data={data}
            index={index}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ol>
    </Paper>
  );
};

export default List;
