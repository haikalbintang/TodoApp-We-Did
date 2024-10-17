import Overlay from "../layouts/Overlay";
import Modal from "../layouts/Modal";

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({ onClose, onDelete }: DeleteModalProps) => {
  return (
    <Overlay onClose={onClose}>
      <Modal>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-bold">Are you sure want to delete this Item?</p>
          <div className="w-full flex justify-around px-6">
            <button
              onClick={onClose}
              className="font-bold py-1.5 px-4 border-2 border-zinc-900 hover:bg-zinc-200 rounded-lg"
            >
              No
            </button>
            <button
              onClick={onDelete}
              className="font-bold py-1.5 px-4 border-2 text-red-600 border-red-600 hover:bg-black rounded-lg"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default DeleteModal;
