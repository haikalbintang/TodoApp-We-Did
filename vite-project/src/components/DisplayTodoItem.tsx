interface Data {
  title: string;
  subtitle: string;
}

interface DisplayTodoItemProps {
  index: number;
  data: Data;
}

const DisplayTodoItem = ({ index, data }: DisplayTodoItemProps) => {
  return (
    <div>
      <h2 className="border-zinc-700 font-bold">
        {index + 1}. {data.title}
      </h2>
      <h3 className="text-sm">{data.subtitle}</h3>
    </div>
  );
};

export default DisplayTodoItem;
