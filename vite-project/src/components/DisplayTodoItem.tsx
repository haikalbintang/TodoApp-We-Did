interface Data {
  title: string;
  subtitle: string;
  order: number;
}

interface DisplayTodoItemProps {
  data: Data;
}

const DisplayTodoItem = ({ data }: DisplayTodoItemProps) => {
  return (
    <div>
      <h2 className="border-zinc-700 font-bold">
        {data.order}. {data.title}
      </h2>
      <h3 className="text-sm">{data.subtitle}</h3>
    </div>
  );
};

export default DisplayTodoItem;
