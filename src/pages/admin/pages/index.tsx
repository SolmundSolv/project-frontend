import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";
import AddPages from "./AddPages";

type PageType = {
  name: string;
  href: string;
  title: string;
};

const columnHelper = createColumnHelper<PageType>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("href", {
    cell: (info) => info.getValue(),
    header: () => <span>URL</span>,
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: () => <span>Title</span>,
  }),
];
const PageWithPages = ({
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
        <AddPages open={open} setOpen={setOpen} types={types} />
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
  admin: PageType[];
  store: PageType[];
  types: { name: string }[];
}> = async () => {
  const res1 = await fetch("http://localhost:3001/page/type/Admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res2 = await fetch("http://localhost:3001/page/type/Store", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res3 = await fetch("http://localhost:3001/page/type", {
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

const AuthPages = withAuth(PageWithPages);

AuthPages.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthPages;
