import { useState } from "react";
import {
  navLinks,
  pastDataSeed,
  // presentDataSeed,
  // futureDataSeed,
} from "./data/dummyData";
import { Item, ListProps } from "./types";

function Navbar({ children, selectedNavLink, setSelectedNavLink }) {
  return (
    <div className="w-full shadow-xl">
      <nav className="mx-auto h-20 max-w-[1366px] flex items-center justify-between">
        <h1 className="min-w-64 pb-2 mx-4 text-5xl font-bold text-teal-600 flex items-center">
          To-do App
        </h1>
        <ul className="flex gap-11">
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
        <div className="min-w-64">{children}</div>
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
          <li key={index} className="py-1">
            <div className="flex items-center justify-between">
              <p className="border-zinc-700 font-medium">
                {index + 1}. {data.title}
              </p>
              <p>{data.status}</p>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              voluptate eveniet eius pariatur repellendus ducimus nulla magni
              incidunt fugit? Unde pariatur quisquam voluptas, repellat
              recusandae ad impedit! Error maxime, fuga laborum nisi animi
              officiis dolorum?
            </div>
          </li>
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
        <button className="bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full">
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
