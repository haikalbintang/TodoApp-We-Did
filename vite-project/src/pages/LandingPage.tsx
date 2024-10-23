import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="relative h-screen w-screen flex flex-col justify-center items-center gap-6 ">
      <div className="h-2/5"></div>
      <div className="flex flex-col h-full w-full justify-center items-center gap-8">
        <div className="relative">
          <div className="-rotate-[16deg] -top-6 w-28 ml-2 bg-zinc-300 rounded-lg">
            <img
              className="transform rotate-[16deg] p-1"
              src="/check-icon-big.png"
              alt="check icon"
            />
          </div>
          <div className="-z-10 absolute -rotate-[36deg] top-0 w-28 h-28 ml-2 bg-teal-200 rounded-lg"></div>
        </div>
        <h1 className="text-5xl font-bold text-teal-600 items-center">
          TodoApp
        </h1>
      </div>
      <button
        onClick={() => navigate("/register")}
        className="ring-[3px] ring-fuchsia-900 bg-fuchsia-900 text-fuchsia-200 border-2 border-fuchsia-200 py-2 px-6 text-lg font-bold rounded-full"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/login")}
        className="bg-fuchsia-200 text-fuchsia-900 border-[3px] border-fuchsia-900 py-2 px-6 text-lg font-bold rounded-full mx-5"
      >
        Login
      </button>
      <div className="h-80 flex flex-col justify-end mb-4 items-center text-sm text-teal-600 font-medium">
        <p>&copy; 2024 Muhammad Haikal Bintang.</p>
        <p>All rights reserved.</p>
      </div>
    </main>
  );
}
