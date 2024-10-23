import { useEffect, useState } from "react";

import useTodos from "../hooks/useTodos";

import Main from "../layouts/Main";
import Navbar from "../components/Navbar";
import List from "../components/List";
import Form from "../components/AddItemForm";
import DeleteModal from "../components/DeleteModal";

import { FaFeather } from "react-icons/fa6";
import { GetItem, Profile } from "../types";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";

function MainPage() {
  const {
    isLoading,
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
    setTodoToEdit,
  } = useTodos();
  const [profile, setProfile] = useState<Profile>({ nickname: "" });
  const [selectedNavLink, setSelectedNavLink] = useState("today");
  const [formIsShown, setFormIsShown] = useState(false);
  const [deleteIsShown, setDeleteIsShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser(); // Mengambil user yang sedang login

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", user.id) // Menggunakan ID dari user yang sudah terautentikasi
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (data) {
          setProfile((prev) => ({ ...prev, nickname: data.nickname })); // Simpan nickname ke state
        }
      } else if (userError) {
        console.error("Error fetching user:", userError.message);
      }
    };

    fetchProfile();
  }, []);

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

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <>
      <div className="relative min-h-screen no-sx">
        <Navbar
          selectedNavLink={selectedNavLink}
          setSelectedNavLink={setSelectedNavLink}
          // onClickLogin={() => setLoginIsShown(true)}
        >
          <button
            // onClick={() => setSignUpIsShown(true)}
            className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full"
          >
            Sign Up
          </button>
          <button
            // onClick={() => setLoginIsShown(true)}
            className="hidden bg-fuchsia-900 text-fuchsia-200 py-2 px-6 text-lg rounded-full mx-5"
          >
            Login
          </button>
        </Navbar>
        <div className="mx-auto max-w-[1366px] px-4 pb-24">
          <Main>
            {selectedNavLink === "daily" && (
              <List
                key={0}
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
                isLoading={isLoading}
              />
            )}

            {selectedNavLink === "today" && (
              <>
                <List
                  key={1}
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
                  isLoading={isLoading}
                />
              </>
            )}

            {selectedNavLink === "later" && (
              <List
                key={2}
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
                isLoading={isLoading}
              />
            )}
          </Main>

          <div
            onClick={handleAddItemForm}
            className="fixed cursor-pointer animate-bounce bg-teal-500 p-5 rounded-full right-5 bottom-6 shadow-zinc-600 shadow-lg"
          >
            <FaFeather className="text-4xl" />
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

      <div className="m-6">
        <p>not {profile.nickname}?</p>
        <p
          onClick={handleLogout}
          className="cursor-pointer text-fuchsia-600 underline"
        >
          Logout
        </p>
      </div>
    </>
  );
}

export default MainPage;
