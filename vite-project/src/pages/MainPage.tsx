import { useEffect, useRef, useState } from "react";

import useTodos from "../hooks/useTodos";

import Main from "../layouts/Main";
import Navbar from "../components/Navbar";
import List from "../components/List";
import Form from "../components/AddItemForm";
import DeleteModal from "../components/DeleteModal";

import { FaFeather } from "react-icons/fa6";
import { GetItem, Profile } from "../types";
import supabase from "../services/supabase";
import TimelineButton from "../components/TimelineButton";

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
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    username: "",
  });
  const [selectedNavLink, setSelectedNavLink] = useState("home");
  const [formIsShown, setFormIsShown] = useState(false);
  const [deleteIsShown, setDeleteIsShown] = useState(false);
  const [profileIsLoading, setProfileIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    async function loadProfile() {
      setProfileIsLoading(true);
      await fetchProfile();
      setProfileIsLoading(false);
    }

    loadProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("nickname, username")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else if (data) {
        setProfile((prev) => ({
          ...prev,
          nickname: data.nickname,
          username: data.username,
        }));
      }
    } else if (userError) {
      console.error("Error fetching user:", userError.message);
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

  return (
    <>
      <div className="relative h-screen">
        <Navbar
          selectedNavLink={selectedNavLink}
          setSelectedNavLink={setSelectedNavLink}
        ></Navbar>
        {selectedNavLink === "home" && profileIsLoading ? (
          <div className="flex justify-center items-center h-full pt-72 pb-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-800"></div>
          </div>
        ) : selectedNavLink === "home" ? (
          <main className="p-10 mx-auto max-w-[1366px] px-4">
            <h1 className="font-bold text-wrap text-5xl mt-4 mb-10">
              <span className="text-teal-600">Welcome</span>
              <span className="text-zinc-800">, {profile.nickname}!</span>
            </h1>
            <h2 className="mb-2 text-zinc-800">
              This App's main purpose is to organize your tasks or activities
              into <span className="font-bold">three</span> different lists:
            </h2>
            <div className="flex flex-col gap-1 my-3 px-2">
              <div
                onClick={() => setSelectedNavLink("daily")}
                className="flex items-center gap-2"
              >
                <TimelineButton type="button" color="emerald" />
                <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
                  daily
                </p>
              </div>

              <div
                onClick={() => setSelectedNavLink("today")}
                className="flex items-center gap-2"
              >
                <TimelineButton type="button" color="sky" />
                <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
                  today
                </p>
              </div>

              <div
                onClick={() => setSelectedNavLink("later")}
                className="flex items-center gap-2"
              >
                <TimelineButton type="button" color="orange" />
                <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
                  later
                </p>
              </div>
            </div>

            <h2 className="text-zinc-800 mb-2">
              To add a new task, click the feather button. You can edit and
              delete any task by clicking the icons.
            </h2>
            <h2 className="text-zinc-800 mb-6">
              You can move tasks between lists by clicking the right-colored
              bullet.
            </h2>
            <h2 className="text-zinc-800 text-lg font-bold">
              {">"} Got it, let's go!
            </h2>
          </main>
        ) : null}
        <div
          ref={containerRef}
          className="mx-auto w-screen h-screen overflow-x-auto px-4 pb-24"
        >
          <Main>
            <div>
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
              />
            </div>

            <div>
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
              />
            </div>

            <div>
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
              />
            </div>

            <div>
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
              />
            </div>
          </Main>

          <div
            onClick={handleAddItemForm}
            className="fixed cursor-pointer animate-bounce bg-teal-500 p-5 rounded-full right-5 bottom-6 shadow-zinc-600 shadow-lg"
          >
            <FaFeather className="text-4xl" />
          </div>

          <div className="m-6">
            <p>not {profile.username}?</p>
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
    </>
  );
}

export default MainPage;
