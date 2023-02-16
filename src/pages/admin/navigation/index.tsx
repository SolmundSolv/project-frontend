import { createColumnHelper } from "@tanstack/react-table";
import { exec } from "child_process";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";
import AddLink from "./AddLink";

type NavLink = {
  id: string;
  name: string;
  href: string;
  iconPath: string;
};

const columnHelper = createColumnHelper<NavLink>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("href", {
    cell: (info) => info.getValue(),
    header: () => <span>URL</span>,
  }),
  columnHelper.accessor("iconPath", {
    cell: (info) => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mr-4 h-6 w-6"
        >
          <g dangerouslySetInnerHTML={{ __html: info.getValue() }}></g>
        </svg>
      );
    },
    header: () => <span>Icon</span>,
  }),
];
const NavigationPage = ({
  admin,
  store,
  types,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const typeRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  return (
    <div className="m-6 bg-white p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Navigation</h1>
        <button
          className="flex rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add
        </button>
        <AddLink open={open} setOpen={setOpen} types={types} />
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <span className="text-xl font-bold">Admin</span>
          <Table columns={columns} tableData={admin} />
        </div>
        <div>
          <span className="text-xl font-bold">Store</span>
          <Table columns={columns} tableData={store} />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span className="text-xl font-bold">Types</span>
          <div className="flex gap-2">
            <input
              type="text"
              ref={typeRef}
              className="rounded-lg border-2 border-gray-300 px-3 py-2"
            />

            <button
              className="flex rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600"
              type="button"
              onClick={() => {
                if (!typeRef.current?.value) alert("Please enter a type");
                fetch("http://localhost:3001/navigation/type", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: typeRef.current?.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
        <ul>
          {types &&
            types.map((type, index) => <li key={index}>{type.name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  admin: NavLink[];
  store: NavLink[];
  types: { name: string }[];
}> = async () => {
  const res1 = await fetch("http://localhost:3001/navigation/type/Admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res2 = await fetch("http://localhost:3001/navigation/type/Store", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res3 = await fetch("http://localhost:3001/navigation/type", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const admin = await res1.json();
  const store = await res2.json();
  const types = await res3.json();
  return {
    props: {
      admin,
      store,
      types,
    },
  };
};

const AuthNavigation = withAuth(NavigationPage);

AuthNavigation.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthNavigation;
