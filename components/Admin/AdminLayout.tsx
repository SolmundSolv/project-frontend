import LoginBtn from "../LoginBtn";
import Sidebar from "./Sidebar";

import React, { useState } from "react";
import Navbar from "./Navbar";
import StateContext from "../../context/StateContext";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg">
      <button onClick={toggleMenu}>Toggle menu</button>
      {isOpen && (
        <ul>
          <li>Menu item 1</li>
          <li>Menu item 2</li>
          <li>Menu item 3</li>
        </ul>
      )}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminLayout = ({ children }: any) => {
  return (
    <StateContext>
      <div className="grid grid-cols-[300px,_1fr] grid-rows-[100px,_1fr]">
        <div className="col-start-1 row-span-2 row-start-1 border-r border-gray-700">
          <Sidebar />
        </div>
        <Navbar />
        <main className="content-area row-start-2 overflow-auto bg-slate-100">
          {children}
        </main>
      </div>
    </StateContext>
  );
};

export default AdminLayout;
