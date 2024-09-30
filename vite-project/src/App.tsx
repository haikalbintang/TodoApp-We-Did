import { useEffect, useState } from "react";
import { getTodos } from "./services/apiTodos";
import Navbar from "./components/Navbar";
import List from "./components/List";
import { mainDataSeed } from "./data/dummyData";
import { Item } from "./types";
import Form from "./components/Form";
import { FaFeather } from "react-icons/fa6";

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("present");
  const [mainData, setMainData] = useState(mainDataSeed);
  // const [futureData, setFutureData] = useState(futureDataSeed);
  const [currentTodoItem, setCurrentTodoItem] = useState("");
  const [formIsShown, setFormIsShown] = useState(false);

  useEffect(() => {
    getTodos().then((data) => console.log(data));
  });

  function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    const new_item: Item = {
      title: currentTodoItem,
      subtitle: "",
      descriptions: [],
      status: "",
    };

    setMainData([...mainData, new_item]);
    setCurrentTodoItem("");
  }

  // function handleAddFutureItem(e: React.FormEvent) {
  //   e.preventDefault();
  //   const new_item: Item = {
  //     title: currentTodoItem,
  //     subtitle: "",
  //     descriptions: [],
  //     status: "",
  //   };

  //   setFutureData([...futureData, new_item]);
  //   setCurrentTodoItem("");
  // }

  return (
    <div className="relative min-h-screen">
      <Navbar
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
      >
        <button className="bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-10">
          Profile
        </button>
      </Navbar>
      <div className="mx-auto max-w-[1366px]">
        <main className="h-fit flex justify-center pt-10 pb-0 gap-4">
          {selectedNavLink === "present" ? (
            <List
              title={"Main"}
              onClick={() => setSelectedNavLink("present")}
              data={mainData}
              onAddItem={handleAddItem}
              currentTodoItem={currentTodoItem}
            />
          ) : null}
          {/* {selectedNavLink === "future" ? (
          <List
            title={"Future"}
            onClick={() => setSelectedNavLink("future")}
            data={futureDataSeed}
            onAddItem={handleAddFutureItem}
            currentTodoItem={currentTodoItem}
          />
        ) : null} */}
        </main>
        <div
          onClick={() => setFormIsShown(true)}
          className="fixed cursor-pointer bg-sky-300 p-5 rounded-full right-36 bottom-10 shadow-zinc-400 shadow-lg"
        >
          <FaFeather className="text-4xl" />
        </div>
      </div>
      {formIsShown && (
        <Form
          inputValue={currentTodoItem}
          onChange={(e) => setCurrentTodoItem(e.target.value)}
          onAddItem={handleAddItem}
          onClose={() => setFormIsShown(false)}
        />
      )}
    </div>
  );
}

export default App;
