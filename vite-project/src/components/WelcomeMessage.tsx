import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import TimelineButton from "./TimelineButton";
import { Profile } from "../types";

interface WelcomeMessageProps {
  showWelcomeMessage: boolean;
  setShowWelcomeMessage: (show: boolean) => void;
}

const WelcomeMessage = ({
  showWelcomeMessage,
  setShowWelcomeMessage,
}: WelcomeMessageProps) => {
  const [profile, setProfile] = useState<Profile>({
    nickname: "",
    username: "",
  });

  useEffect(() => {
    const hasSeenWelcomeMessage = localStorage.getItem("hasSeenWelcomeMessage");
    if (!hasSeenWelcomeMessage) {
      setShowWelcomeMessage(true);
      localStorage.setItem("hasSeenWelcomeMessage", "true");
    }
  }, []);

  useEffect(() => {
    async function loadProfile() {
      await fetchProfile();
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
  if (!showWelcomeMessage) return null;

  return (
    <main className="relative py-4 px-8 mb-4 mt-8 mx-auto max-w-[1366px] bg-teal-50 rounded-2xl border-2 border-teal-600">
      <div
        onClick={() => setShowWelcomeMessage(false)}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#0d9488"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#0d9488"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h1 className="font-bold text-wrap text-5xl mt-4 mb-10">
        <span className="text-teal-600">Welcome</span>
        <span className="text-zinc-800">, {profile.nickname}!</span>
      </h1>
      <h2 className="mb-2 text-zinc-800">
        This App's main purpose is to organize your tasks or activities into{" "}
        <span className="font-bold">three</span> different lists:
      </h2>
      <div className="flex flex-col gap-1 my-3 px-2">
        <div className="flex items-center gap-2">
          <TimelineButton type="button" color="emerald" />
          <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
            daily
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TimelineButton type="button" color="sky" />
          <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
            today
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TimelineButton type="button" color="orange" />
          <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
            later
          </p>
        </div>
      </div>

      <h2 className="text-zinc-800 mb-2">
        To add a new task, click the feather button. You can edit and delete any
        task by clicking the icons.
      </h2>
      <h2 className="text-zinc-800 mb-6">
        You can move tasks between lists by clicking the right-colored bullet.
      </h2>
      <h2 className="text-zinc-800 mb-6 flex space-x-3 items-center">
        <span className="font-bold p-2">Update: </span> We added two additional
        lists:{" "}
        <div className="flex items-center gap-1">
          <TimelineButton type="button" color="gray" />
          <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
            backlog
          </p>
        </div>
        <p>and</p>
        <div className="flex items-center gap-1">
          <TimelineButton type="button" color="red" />
          <p className="font-bold pb-1 tracking-wider text-lg text-zinc-700">
            done
          </p>
        </div>
        .
      </h2>
      <h2 className="text-zinc-800 text-lg font-bold">
        {">"} Got it, let's go!
      </h2>
    </main>
  );
};

export default WelcomeMessage;
