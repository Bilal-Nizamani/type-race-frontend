"use client";
import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto bg-gray-900 text-white  p-4 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <Link href="/type-race">
          <div className="bg-gray-800 rounded-lg p-4  hover:text-blue-600 transition duration-300  hover:scale-105">
            Multiplayer Auto Room Matching
          </div>
        </Link>

        <Link href="rooms">
          <div className="bg-gray-800 rounded-lg p-4  hover:text-blue-600 transition duration-300  hover:scale-105">
            Multiplayer manual Room Matching
          </div>
        </Link>

        <Link href="#">
          <div className="bg-gray-800 rounded-lg p-4  hover:text-blue-600 transition duration-300  hover:scale-105">
            Signle-Player
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
