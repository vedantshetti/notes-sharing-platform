import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      {/* Header Section */}
      <header className="text-center max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 drop-shadow-md leading-tight">
          Welcome to SPPU Notes Sharing Platform
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          Your one-stop solution for accessing and sharing curated educational notes for 
          <span className="text-blue-600 font-semibold"> Savitribai Phule Pune University (SPPU)</span>.
        </p>
        <p className="mt-2 text-sm md:text-lg text-gray-600">
          Designed to enhance learning and make academic resources accessible to everyone.
        </p>
      </header>
    </div>
  );
};

export default HomePage;
