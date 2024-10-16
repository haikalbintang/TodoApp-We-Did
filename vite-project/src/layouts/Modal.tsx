import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mx-auto p-4 fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-50"
    >
      <div className="w-[329px]">{children}</div>
    </div>
  );
};

export default Modal;
