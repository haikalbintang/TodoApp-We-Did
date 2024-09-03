import { useState } from "react";
import "./App.css";

const navLinks = [{ name: "past" }, { name: "present" }, { name: "future" }];

const status = {
  newEntry: "newEntry",
  progress: "progress",
  withNote: "note",
  done: "done",
};

let pastData = [
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

function App() {
  const [selectedNavLink, setSelectedNavLink] = useState("");
  return (
    <>
      <nav>
        <h1>Do-doo list</h1>
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
      <main className="min-h-screen flex items-center justify-center bg-red-700 p-20 gap-10">
        <div
          className="w-1/3 bg-green-600"
          onClick={() => setSelectedNavLink("past")}
        >
          {selectedNavLink === "past" ? (
            <>
              <h2 className="font-bold">Past</h2>
              <ol>
                {pastData.map((data) => (
                  <li>{data.title}</li>
                ))}
              </ol>
            </>
          ) : (
            <h2>Past</h2>
          )}
        </div>
        <div
          className="w-1/3 bg-yellow-400"
          onClick={() => setSelectedNavLink("present")}
        >
          {selectedNavLink === "present" ? (
            <h2 className="font-bold">Present</h2>
          ) : (
            <h2>Present</h2>
          )}
        </div>
        <div
          className="w-1/3 bg-orange-500"
          onClick={() => setSelectedNavLink("future")}
        >
          {selectedNavLink === "future" ? (
            <h2 className="font-bold">Future</h2>
          ) : (
            <h2>Future</h2>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
