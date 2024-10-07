import { useState } from "react";

interface Item {
  title: string;
  subtitle: string;
  description: string;
  status: string;
}

interface ListProps {
  title: string;
  data: Item[];
  inputValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddItem?: (e: React.FormEvent) => void;
}

const List = ({ title, data, inputValue, onChange, onAddItem }: ListProps) => {
  const [formIsShown, setFormIsShown] = useState(false);

  return (
    <>
      <h2 className="font-bold">{title}</h2>
      <ol>
        {data.map((data, index) => (
          <li key={index}>
            <div className="flex items-center justify-between group">
              <p>
                {index + 1}. {data.title}
              </p>
              <p className="hidden group-hover:block">bulet</p>
              <p className="block group-hover:hidden">{data.status}</p>
            </div>
          </li>
        ))}
      </ol>
      {formIsShown === false ? (
        <p
          className="font-bold text-right text-5xl"
          onClick={() => setFormIsShown(true)}
        >
          +
        </p>
      ) : (
        <form onSubmit={onAddItem} action="">
          <input type="text" value={inputValue} onChange={onChange} />
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
};

export default List;
