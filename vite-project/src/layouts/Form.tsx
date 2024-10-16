import { FormEvent, ReactNode } from "react";

interface FormProps {
  onSubmit: (e: FormEvent<Element>) => void;
  children: ReactNode;
}

const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form onSubmit={onSubmit} action="">
      {children}
    </form>
  );
};

export default Form;
