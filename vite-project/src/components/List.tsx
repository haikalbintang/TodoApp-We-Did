import { GetItem } from "../types";
import TodoItem from "./TodoItem";
import Paper from "../layouts/Paper";

export interface ListProps {
  data: GetItem[];
  title: string;
  onClick: () => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (todo: GetItem) => void;
  bgColor: string;
  selectedBgColor: string;
  onPastClick: (id: number) => Promise<void>;
  onPresentClick: (id: number) => Promise<void>;
  onFutureClick: (id: number) => Promise<void>;
}

const List = ({
  data,
  title,
  onClick,
  onDeleteTodo,
  onEditTodo,
  bgColor,
  selectedBgColor,
  onPastClick,
  onPresentClick,
  onFutureClick,
}: ListProps) => {
  return (
    <Paper onClick={onClick} title={title} bgColor={bgColor}>
      {data.map((data, index) => (
        <TodoItem
          key={data.id}
          data={data}
          index={index}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
          selectedBgColor={selectedBgColor}
          onPastClick={onPastClick}
          onPresentClick={onPresentClick}
          onFutureClick={onFutureClick}
        />
      ))}
    </Paper>
  );
};

export default List;
