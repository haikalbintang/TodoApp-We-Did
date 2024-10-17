interface AddDescBtnProps {
  onAddDescription: () => void;
}

const AddDescBtn = ({ onAddDescription }: AddDescBtnProps) => {
  return (
    <div className="ml-3">
      <button
        type="button"
        onClick={onAddDescription}
        className="hover:cursor-pointer text-zinc-800 flex max-w-[134px] gap-6 items-center justify-between px-2 py-1.5 my-3 bg-sky-300 rounded-lg"
      >
        <p className="font-bold flex gap-2 items-center">
          <span className="text-xl flex items-center justify-center bg-sky-200 rounded-full h-5 w-5">
            +
          </span>
          Description
        </p>
      </button>
    </div>
  );
};

export default AddDescBtn;
