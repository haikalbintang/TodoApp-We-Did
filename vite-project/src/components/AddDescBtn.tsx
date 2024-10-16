interface AddDescBtnProps {
    onAddDescription: () => void
}

const AddDescBtn = ({onAddDescription}: AddDescBtnProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={onAddDescription}
        className="hover:cursor-pointer text-zinc-800 flex max-w-[134px] gap-6 items-center justify-between px-2 py-2 my-3 bg-sky-300 rounded-lg"
      >
        <p className="font-semibold">+ Description</p>
      </button>
    </div>
  );
};

export default AddDescBtn;
