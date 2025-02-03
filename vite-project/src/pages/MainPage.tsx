import { useEffect, useRef, useState } from "react";

import useTodos from "../hooks/useTodos";

import Main from "../layouts/Main";
import Navbar from "../components/Navbar";
import List from "../components/List";
import Form from "../components/AddItemForm";
import DeleteModal from "../components/DeleteModal";

import { FaFeather } from "react-icons/fa6";
import { GetItem } from "../types";
import WelcomeMessage from "../components/WelcomeMessage";

function MainPage() {
  const {
    isLoading,
    backlog,
    done,
    pastData,
    mainData,
    futureData,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToBacklog,
    handleToPast,
    handleToPresent,
    handleToFuture,
    handleToDone,
    confirmDelete,
    todoToEdit,
    // todoToDelete,
    setTodoToEdit,
  } = useTodos();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [selectedNavLink, setSelectedNavLink] = useState("today");
  const [formIsShown, setFormIsShown] = useState(false);
  const [deleteIsShown, setDeleteIsShown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const backlogRef = useRef<HTMLDivElement>(null);
  const dailyRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);
  const laterRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && todayRef.current) {
      const container = containerRef.current;
      const todayElement = todayRef.current;

      const scrollLeft =
        todayElement.offsetLeft -
        container.offsetWidth / 2 +
        todayElement.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = (navLink: string) => {
    setSelectedNavLink(navLink);

    if (navLink === "backlog" && backlogRef.current) {
      backlogRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (navLink === "daily" && dailyRef.current) {
      dailyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (navLink === "today" && todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (navLink === "later" && laterRef.current) {
      laterRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (navLink === "done" && doneRef.current) {
      doneRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  function handleAddItemForm() {
    setTodoToEdit(null);
    setFormIsShown(true);
  }
  function handleEdit(todo: GetItem) {
    handleEditTodo(todo);
    setFormIsShown(true);
  }

  function handleCloseForm() {
    setTodoToEdit(null);
    setFormIsShown(false);
  }

  function handleDelete(id: number) {
    setDeleteIsShown(true);
    handleDeleteTodo(id);
  }

  function handleConfirmDelete() {
    confirmDelete();
    setDeleteIsShown(false);
  }

  const handleHelpClick = () => {
    setShowWelcomeMessage(true);
  };

  return (
    <div className="h-screen">
      <div className="">
        <Navbar
          selectedNavLink={selectedNavLink}
          setSelectedNavLink={handleNavClick}
          onHelpClick={handleHelpClick}
        />

        {showWelcomeMessage && (
          <WelcomeMessage
            showWelcomeMessage={showWelcomeMessage}
            setShowWelcomeMessage={setShowWelcomeMessage}
          />
        )}

        <div
          ref={containerRef}
          className="mx-auto overflow-x-scroll px-4 pb-24 pt-6"
        >
          <Main>
            <div ref={backlogRef}>
              <List
                key={0}
                title={"Backlogs"}
                onClick={() => setSelectedNavLink("backlog")}
                data={backlog}
                bgColor="bg-gray-300"
                selectedBgColor="bg-gray-200"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
                onBacklogClick={handleToBacklog}
                onDoneClick={handleToDone}
                isLoading={isLoading}
                list="backlog"
                activeNavLink={selectedNavLink}
              />
            </div>

            <div ref={dailyRef}>
              <List
                key={1}
                title={"Daily Habits"}
                onClick={() => setSelectedNavLink("daily")}
                data={pastData}
                bgColor="bg-emerald-300"
                selectedBgColor="bg-emerald-200"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
                onBacklogClick={handleToBacklog}
                onDoneClick={handleToDone}
                isLoading={isLoading}
                list="daily"
                activeNavLink={selectedNavLink}
              />
            </div>

            <div ref={todayRef}>
              <List
                key={2}
                title={"Today"}
                onClick={() => setSelectedNavLink("today")}
                data={mainData}
                bgColor="bg-sky-300"
                selectedBgColor="bg-sky-200"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
                onBacklogClick={handleToBacklog}
                onDoneClick={handleToDone}
                isLoading={isLoading}
                list="today"
                activeNavLink={selectedNavLink}
              />
            </div>

            <div ref={laterRef}>
              <List
                key={3}
                title={"Todo List"}
                onClick={() => setSelectedNavLink("later")}
                data={futureData}
                bgColor="bg-orange-300"
                selectedBgColor="bg-orange-200"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
                onBacklogClick={handleToBacklog}
                onDoneClick={handleToDone}
                isLoading={isLoading}
                list="later"
                activeNavLink={selectedNavLink}
              />
            </div>

            <div ref={doneRef}>
              <List
                key={4}
                title={"Done"}
                onClick={() => setSelectedNavLink("done")}
                data={done}
                bgColor="bg-red-400"
                selectedBgColor="bg-red-300"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
                onBacklogClick={handleToBacklog}
                onDoneClick={handleToDone}
                isLoading={isLoading}
                list="done"
                activeNavLink={selectedNavLink}
              />
            </div>
          </Main>

          <div
            onClick={handleAddItemForm}
            className="fixed cursor-pointer animate-bounce bg-fuchsia-950 p-5 rounded-full right-5 bottom-6 shadow-zinc-600 shadow-lg"
          >
            <FaFeather className="text-4xl text-fuchsia-300" />
          </div>
        </div>

        {formIsShown && (
          <Form
            onClose={handleCloseForm}
            onSubmit={handleAddTodo}
            initialData={todoToEdit}
          />
        )}
        {deleteIsShown && (
          <DeleteModal
            onClose={() => setDeleteIsShown(false)}
            onDelete={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}

export default MainPage;
