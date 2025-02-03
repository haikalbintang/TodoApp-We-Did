import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-4 justify-center">
      <h1 className="hidden xl:block pb-2 ml-4 xl:ml-0 text-4xl font-bold text-teal-600 items-center">
        TodoApp
      </h1>
      <div className="relative">
        <div className="-rotate-[16deg] -top-6 w-12 ml-2 bg-zinc-300 rounded-lg">
          <img
            className="transform rotate-[16deg] p-1"
            src="/check-icon-big.png"
            alt="check icon"
          />
        </div>
        <div className="-z-10 absolute -rotate-[36deg] left-0 top-0 w-12 h-12 ml-2 bg-teal-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Logo;
