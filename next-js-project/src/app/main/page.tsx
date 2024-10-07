"use client";

import { useState } from "react";
import List from "@/components/List";

const navLinks = [{ name: "past" }, { name: "present" }, { name: "future" }];

const status = {
  newEntry: "newEntry",
  progress: "progress",
  withNote: "note",
  done: "done",
};

let pastDataSeed = [
  {
    title: "Berenang",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
  {
    title: "Belanja",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
  {
    title: "Belajar",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
  {
    title: "Nyetir",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
];

let presentDataSeed = [
  {
    title: "Ngoding",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
];

let futureDataSeed = [
  {
    title: "Piknik",
    subtitle: "50 m",
    description: "di Gema Pesona",
    status: status.done,
  },
];

interface Item {
  title: string;
  subtitle: string;
  description: string;
  status: string;
}

function MainPage() {
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
      <nav>
        <h1>We-Did list</h1>
        <ul>
          {navLinks.map((navLink) => (
            <li>
              <button onClick={() => setSelectedNavLink(navLink.name)}>
                {navLink.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="min-h-screen flex justify-center bg-red-700 p-20 gap-14">
        <div
          className="w-1/3 bg-green-600"
          onClick={() => setSelectedNavLink("past")}
        >
          {selectedNavLink === "past" ? (
            <List
              title="Past"
              data={pastData}
              onChange={(e) => setCurrentTodo(e.target.value)}
              inputValue={currentTodo}
              onAddItem={handleAddPast}
            />
          ) : (
            <h2>Past is inactive</h2>
          )}
        </div>
        <div
          className="w-1/3 bg-yellow-400"
          onClick={() => setSelectedNavLink("present")}
        >
          {selectedNavLink === "present" ? (
            <List title="Present" data={presentDataSeed} />
          ) : (
            <h2>Present is inactive</h2>
          )}
        </div>
        <div
          className="w-1/3 bg-orange-500"
          onClick={() => setSelectedNavLink("future")}
        >
          {selectedNavLink === "future" ? (
            <List title="Future" data={futureDataSeed} />
          ) : (
            <>
              <h2>Future is inactive</h2>
              <p>Dy8*K_Nh_P8fgT9</p>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default MainPage;
