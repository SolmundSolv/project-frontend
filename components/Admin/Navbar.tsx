import Link from "next/link";
import React, { useState } from "react";
import LoginBtn from "../LoginBtn";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="max-w-screen flex bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 align-bottom">
        <a href="#" className="text-xl font-bold">
          Admin Dashboard
        </a>
        <div>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleMenu}
              className="focus:shadow-outline-blue flex rounded-full p-2 text-sm font-semibold hover:bg-gray-700 focus:outline-none"
            >
              Profile{" "}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg">
                <div
                  className="shadow-xs flex flex-col gap-2 rounded-md bg-white p-2 text-left text-black"
                  onClick={toggleMenu}
                >
                  <LoginBtn />
                  <Link href="/" className="text-sm font-medium">
                    Store
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
