import { ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  onClose: () => void;
}

const Overlay = ({ children, onClose }: OverlayProps) => {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50">
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
        {children}
      </div>
    </div>
  );
};

export default Overlay;
