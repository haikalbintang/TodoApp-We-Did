interface Header2Props {
  title: string;
}

const Header2 = ({ title }: Header2Props) => {
  return (
    <div className="border-b-4 border-zinc-700 pb-4">
      <h2 className="font-bold text-center text-xl text-zinc-800">{title}</h2>
    </div>
  );
};

export default Header2;
