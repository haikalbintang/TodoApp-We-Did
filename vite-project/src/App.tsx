import { useEffect, useState } from "react";
import {
  navLinks,
  pastDataSeed,
  // presentDataSeed,
  // futureDataSeed,
} from "./data/dummyData";
import { Item, ListProps } from "./types";
import { ImCross } from "react-icons/im";
import { getTodos } from "./services/apiTodos";

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
            <li key={navLink.name}>
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
        descIsShown ? "bg-sky-200" : ""
      } py-1 hover:bg-sky-200 px-2 my-2 hover:cursor-pointer ${
        data.status === "done" ? "text-zinc-500" : ""
      }`}
    >
      <div
        className="flex items-center justify-between"
        onClick={handleToggleDesc}
      >
        <div>
          <h2 className="border-zinc-700 font-semibold">
            {index + 1}. {data.title}
          </h2>
          <h3>{data.subtitle}</h3>
        </div>
        <div className="flex gap-2">
          <button className="h-4 w-4 rounded-full bg-emerald-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-yellow-300 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
          <button className="h-4 w-4 rounded-full bg-orange-400 border-2 border-zinc-700 hover:border-orange-300 hover:cursor-pointer"></button>
        </div>
      </div>
      {descIsShown && (
        <div className="relative pl-5 hover:cursor-default overflow-x-clip">
          <ul>
            {data.descriptions?.map((description: string, index: string) => (
              <li className="list-disc mt-1 text-sm" key={index}>
                {description}
              </li>
            ))}
          </ul>
          <div
            onClick={() => setDescIsShown(false)}
            className="absolute text-xs -right-0.5 bottom-0.5 w-4 h-4 rounded-full text-red-800 cursor-pointer"
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

  useEffect(() => {
    getTodos().then((data) => console.log(data));
  });

  function handleAddPast(e: React.FormEvent) {
    e.preventDefault();
    const new_item: Item = {
      title: currentTodo,
      subtitle: "",
      descriptions: [],
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
      <main className="h-fit flex justify-center px-20 pt-10 pb-0 gap-14">
        <div
          className="w-1/3 bg-sky-300 p-5 rounded-2xl"
          onClick={() => setSelectedNavLink("past")}
        >
          {selectedNavLink === "past" ? (
            <>
              <List
                title="Main"
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
