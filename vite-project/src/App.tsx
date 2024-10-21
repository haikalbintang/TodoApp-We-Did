import { useState } from "react";

import useTodos from "./hooks/useTodos";
import useAuth from "./hooks/useAuth";

import Main from "./layouts/Main";
import Navbar from "./components/Navbar";
import List from "./components/List";
import Form from "./components/AddItemForm";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DeleteModal from "./components/DeleteModal";

import { FaFeather } from "react-icons/fa6";
import { GetItem } from "./types";

function App() {
  const {
    pastData,
    mainData,
    futureData,
    handleAddTodo,
    handleDeleteTodo,
    handleEditTodo,
    handleToPast,
    handleToPresent,
    handleToFuture,
    confirmDelete,
    todoToEdit,
  } = useTodos();

  const {
    loginIsShown,
    signUpIsShown,
    setLoginIsShown,
    setSignUpIsShown,
    handleLogin,
    handleSignUp,
  } = useAuth();

  const [selectedNavLink, setSelectedNavLink] = useState("present");
  const [formIsShown, setFormIsShown] = useState(false);
  const [deleteIsShown, setDeleteIsShown] = useState(false);

  function handleEdit(todo: GetItem) {
    handleEditTodo(todo);
    setFormIsShown(true);
  }

  function handleDelete(id: number) {
    setDeleteIsShown(true);
    handleDeleteTodo(id);
  }

  function handleConfirmDelete() {
    confirmDelete();
    setDeleteIsShown(false);
  }

  return (
    <div className="relative min-h-screen no-sx">
      <Navbar
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
        onClickLogin={() => setLoginIsShown(true)}
      >
        <button
          onClick={() => setSignUpIsShown(true)}
          className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full"
        >
          Sign Up
        </button>
        <button
          onClick={() => setLoginIsShown(true)}
          className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-5"
        >
          Login
        </button>
      </Navbar>
      <div className="mx-auto max-w-[1366px] px-4 pb-32">
        <Main>
          {selectedNavLink === "past" && (
            <List
              key={0}
              title={"Daily Habit"}
              onClick={() => setSelectedNavLink("past")}
              data={pastData}
              bgColor="bg-emerald-300"
              selectedBgColor="bg-emerald-200"
              onDeleteTodo={handleDelete}
              onEditTodo={handleEdit}
              onPastClick={handleToPast}
              onPresentClick={handleToPresent}
              onFutureClick={handleToFuture}
            />
          )}

          {selectedNavLink === "present" && (
            <>
              <List
                key={1}
                title={"Today"}
                onClick={() => setSelectedNavLink("present")}
                data={mainData}
                bgColor="bg-sky-300"
                selectedBgColor="bg-sky-200"
                onDeleteTodo={handleDelete}
                onEditTodo={handleEdit}
                onPastClick={handleToPast}
                onPresentClick={handleToPresent}
                onFutureClick={handleToFuture}
              />
            </>
          )}

          {selectedNavLink === "future" && (
            <List
              key={2}
              title={"Todo List"}
              onClick={() => setSelectedNavLink("future")}
              data={futureData}
              bgColor="bg-orange-300"
              selectedBgColor="bg-orange-200"
              onDeleteTodo={handleDelete}
              onEditTodo={handleEdit}
              onPastClick={handleToPast}
              onPresentClick={handleToPresent}
              onFutureClick={handleToFuture}
            />
          )}
        </Main>
        <div
          onClick={() => {
            setFormIsShown(true);
          }}
          className="fixed cursor-pointer animate-bounce bg-teal-500 p-5 rounded-full right-5 bottom-6 shadow-zinc-600 shadow-lg"
        >
          <FaFeather className="text-4xl" />
        </div>
      </div>

      {formIsShown && (
        <Form
          onClose={() => setFormIsShown(false)}
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
      {loginIsShown && (
        <Login onClose={() => setLoginIsShown(false)} onSubmit={handleLogin} />
      )}
      {signUpIsShown && (
        <SignUp
          onClose={() => setSignUpIsShown(false)}
          onSubmit={handleSignUp}
        />
      )}
    </div>
  );
}

export default App;
