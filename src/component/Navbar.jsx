import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          Typers World
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-blue-500">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-blue-500">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/rooms" className="text-white hover:text-blue-500">
              Manual Rooms
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
