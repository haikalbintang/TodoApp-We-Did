interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ label, name, value, onChange }: InputTextProps) => {
  return (
    <div className="flex flex-col gap-2 p-3 bg-sky-200 my-3 rounded-lg">
      <label className="text-left font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="text-sm ring border-2 border-zinc-800 py-1 px-2 rounded-lg max-w-80 flex flex-wrap"
      />
    </div>
  );
};

export default InputText;
