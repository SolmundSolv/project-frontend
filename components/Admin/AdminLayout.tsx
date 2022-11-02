import React from "react";
import Sidebar from "./Sidebar";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdminLayout = ({ children }: any) => {
    return (
        <div className="grid grid-cols-[1fr,7fr] grid-rows-[1fr,10fr]">
            <div className="col-start-1 row-span-2 row-start-1 border border-red-600">
                <Sidebar />
            </div>
            <main className="row-start-2 border border-red-600">{children}</main>
        </div>
    );
};

export default AdminLayout;
