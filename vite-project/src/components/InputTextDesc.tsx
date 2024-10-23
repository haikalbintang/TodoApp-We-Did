import { ReactNode } from "react";

interface InputTextDescProps {
  label: string;
  name: string;
  color: string;
  children: ReactNode;
}

const InputTextDesc = ({
  label,
  name,
  color,
  children,
}: InputTextDescProps) => {
  return (
    <div className={`flex flex-col gap-2 p-3 bg-${color}-200 my-3 rounded-lg`}>
      <label
        className={`text-left font-bold px-2 rounded-md bg-${color}-300`}
        htmlFor={name}
      >
        {label}
      </label>
      {/* <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="text-sm ring border-2 border-zinc-800 py-1 px-2 rounded-lg max-w-80 flex flex-wrap"
      /> */}
      {children}
    </div>
  );
};

export default InputTextDesc;
