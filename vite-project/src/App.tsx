import { useState } from "react";
import {
  navLinks,
  pastDataSeed,
  // presentDataSeed,
  // futureDataSeed,
} from "./data/dummyData";
import { Item, ListProps } from "./types";
import { ImCross } from "react-icons/im";

function Navbar({ children, selectedNavLink, setSelectedNavLink }) {
  return (
    <div className="w-full shadow-xl">
      <nav className="mx-auto h-20 max-w-[1366px] flex items-center justify-between">
        <div className="flex w-1/3">
          <h1 className="pb-2 ml-4 text-5xl font-bold text-teal-600 flex items-center">
            To-do App
          </h1>
          <img
            className="w-16 ml-1"
            src="/check-icon-big.png"
            alt="check icon"
          />
        </div>
        <ul className="flex gap-11 w-1/3 items-center justify-center">
          {navLinks.map((navLink) => (
            <li>
              <button
                className={`text-xl
                  ${selectedNavLink === navLink.name ? "text-teal-500" : ""}
                `}
                onClick={() => setSelectedNavLink(navLink.name)}
              >
                {navLink.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="w-1/3 flex justify-end">{children}</div>
      </nav>
    </div>
  );
}

const List = ({ title, data, inputValue, onChange, onAddItem }: ListProps) => {
  const [formIsShown, setFormIsShown] = useState(false);

  return (
    <>
      <div className="border-b-4 border-zinc-700 pb-2 mb-4">
        <h2 className="font-bold text-center text-xl text-zinc-800">{title}</h2>
      </div>
      <ol>
        {data.map((data, index) => (
          <TodoItem key={data.title} data={data} index={index} />
        ))}
      </ol>
      {formIsShown === false ? (
        <p
          className="font-bold text-right text-5xl"
          onClick={() => setFormIsShown(true)}
        >
          +
        </p>
      ) : (
        <form onSubmit={onAddItem} action="">
          <input type="text" value={inputValue} onChange={onChange} />
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
};

function TodoItem({ data, index }) {
  const [descIsShown, setDescIsShown] = useState(false);

  function handleToggleDesc() {
    setDescIsShown((prev) => !prev);
  }
  return (
    <li
      key={index}
      className={`${
        descIsShown ? "bg-emerald-200" : ""
      } py-1 hover:bg-emerald-200 px-2 my-2 hover:cursor-pointer`}
    >
      <div
        className="flex items-center justify-between"
        onClick={handleToggleDesc}
      >
        <p className="border-zinc-700 font-medium">
          {index + 1}. {data.title}
        </p>
        <div className="flex gap-2">
          <button className="h-4 w-4 rounded-full bg-emerald-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-yellow-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-orange-400 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
        </div>
      </div>
      {descIsShown && (
        <div className="relative">
          <div className="hover:cursor-default">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            voluptate eveniet eius pariatur repellendus ducimus nulla magni
            incidunt fugit? Unde pariatur quisquam voluptas, repellat recusandae
            ad impedit! Error maxime, fuga laborum nisi animi officiis dolorum?
          </div>
          <div
            onClick={() => setDescIsShown(false)}
            className="absolute text-xs -right-0.5 bottom-0.5 w-4 h-4 rounded-full text-red-800"
          >
            <ImCross />
          </div>
        </div>
      )}
    </li>
  );
}

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("past");
  const [currentTodo, setCurrentTodo] = useState("");
  const [pastData, setPastData] = useState(pastDataSeed);

  function handleAddPast(e: React.FormEvent) {
    e.preventDefault();
    const new_item: Item = {
      title: currentTodo,
      subtitle: "",
      description: "",
      status: "",
    };

    setPastData([...pastData, new_item]);
    setCurrentTodo("");
  }
  return (
    <>
      <Navbar
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
      >
        <button className="bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-10">
          Profile
        </button>
      </Navbar>
      <main className="min-h-screen flex justify-center px-20 pt-10 pb-0 gap-14">
        <div
          className="w-1/3 bg-emerald-300 p-5 rounded-2xl"
          onClick={() => setSelectedNavLink("past")}
        >
          {selectedNavLink === "past" ? (
            <>
              <List
                title="Past"
                data={pastData}
                onChange={(e) => setCurrentTodo(e.target.value)}
                inputValue={currentTodo}
                onAddItem={handleAddPast}
              />
            </>
          ) : (
            <h2>Past is inactive</h2>
          )}
        </div>
        {/* <div
          className="w-1/3 bg-yellow-300"
          onClick={() => setSelectedNavLink("present")}
        >
          {selectedNavLink === "present" ? (
            <List title="Present" data={presentDataSeed} />
          ) : (
            <h2>Present is inactive</h2>
          )}
        </div>
        <div
          className="w-1/3 bg-orange-400"
          onClick={() => setSelectedNavLink("future")}
        >
          {selectedNavLink === "future" ? (
            <List title="Future" data={futureDataSeed} />
          ) : (
            <h2>Future is inactive</h2>
          )}
        </div> */}
      </main>
    </>
  );
}

export default App;
