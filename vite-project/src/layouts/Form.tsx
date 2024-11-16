import { FormEvent, ReactNode } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<Element>) => void;
  children: ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form className="xl:flex xl:w-full xl:gap-4" onSubmit={onSubmit} action="">
      {children}
    </form>
  );
};

export default Form;
