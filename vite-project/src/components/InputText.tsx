interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({ label, name, value, onChange }: InputTextProps) => {
  return (
    <div className="flex gap-6 items-center justify-between px-2 py-2 my-3 bg-sky-300 rounded-lg">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="text-sm ring border-2 border-zinc-800 py-1 px-2 rounded-md w-80 flex flex-wrap"
      />
    </div>
  );
};

export default InputText;
