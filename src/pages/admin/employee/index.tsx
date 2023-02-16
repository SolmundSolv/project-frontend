import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import { Employee } from "../../../types/responses";
import AddForm from "./AddForm";
import EmployeeTable from "./Table";
import Image from "next/image";
import withAuth from "../WithAuth";

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor("name", {
    id: "number",
    cell: (info) => (
      <div className="flex">
        <Image
          className="aspect-1 max-w-[50px] rounded-full"
          src={`${info.row.original.avatar}`}
          alt=""
          width={50}
          height={50}
        />
        <div className="ml-4 flex flex-col">
          <Link
            href={`employee/${info.row.original.id}`}
            className={"hover:text-blue-500 hover:underline"}
          >
            {info.getValue()}
          </Link>
          <div className="font-semibold text-gray-400">
            {info.row.original.email}
          </div>
        </div>
      </div>
    ),
    header: () => <span>Employee</span>,
  }),
  columnHelper.accessor("address", {
    cell: (info) => info.getValue(),
    header: () => <span>Adress</span>,
  }),
  columnHelper.accessor("role", {
    cell: (info) => (info.getValue() ? info.getValue().name : ""),
    header: () => <span>role</span>,
  }),
  columnHelper.accessor("country", {
    cell: (info) => info.getValue(),
    header: () => <span>Country</span>,
  }),
];

const Employee = ({
  employee,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [open, setOpen] = useState(false);
  if (!employee) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="h-full bg-slate-100 p-6 px-24">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Employee List</h1>
          <div className="flex flex-row space-x-2">
            <button className="rounded bg-white px-4 py-2 font-semibold shadow">
              Filter
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white">
              Create
            </button>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-white p-6 shadow">
          <div className="flex justify-between">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search"
              className="rounded-lg border-none bg-slate-100 p-2 shadow placeholder:font-semibold placeholder:text-gray-400"
            />
            <div className="flex space-x-4">
              <button className="flex gap-2 rounded bg-blue-100 px-4 py-2 font-semibold text-blue-500 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
                Filter
              </button>
              <button className="flex gap-2 rounded bg-blue-100 px-4 py-2 font-semibold text-blue-500 shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Export
              </button>
              <button
                className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-semibold text-blue-100 shadow"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add User
                <AddForm open={open} setOpen={setOpen} />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <EmployeeTable tableData={employee} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};
const AuthEmployee = withAuth(Employee);
//eslint-disable-next-line
//@ts-ignore
AuthEmployee.getLayout = (
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps: GetServerSideProps<{
  employee: Employee[];
}> = async () => {
  const res = await fetch("http://localhost:3001/employee/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const employee = await res.json();
  return {
    props: {
      employee,
    },
  };
};

export default AuthEmployee;
