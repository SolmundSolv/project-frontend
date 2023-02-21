import LoginBtn from "../LoginBtn";
import Sidebar from "./Sidebar";

import React, { useState } from "react";
import Navbar from "./Navbar";
import StateContext from "../../context/StateContext";

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
