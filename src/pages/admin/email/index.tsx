import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next/types";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";

type Email = {
  id: number;
  email: string;
  createdAt: string;
  EmailTemplate: {
    name: string;
  };
};

const columnHelper = createColumnHelper<Email>();

const columns = [
  columnHelper.accessor("EmailTemplate.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Template</span>,
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().split("T")[0],
    header: () => <span>Date</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      return (
        <button className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white">
          Edit
        </button>
      );
    },
    header: () => <span>Edit</span>,
  }),
];

const Email = ({
  emails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="grid gap-6 p-6">
      <div className="rounded-md bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold">Email</h1>
        <div className="mt-4">
          <Table columns={columns} tableData={emails} />
        </div>
      </div>
      <div className="grid rounded-md bg-white p-6 shadow-md">
        <Link
          href={"/admin/email/templates"}
          className="grid aspect-1 h-24 items-center justify-center border p-2 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span className="font-semibold">Templates</span>
        </Link>
      </div>
    </div>
  );
};

const AuthEmail = withAuth(Email);

export const getServerSideProps: GetServerSideProps<{
  emails: Email[];
}> = async () => {
  try {
    const res = await fetch("http://localhost:3001/email", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const emails = await res.json();
    return {
      props: {
        emails: emails,
      },
    };
  } catch (error) {
    return {
      props: {
        emails: "No data" as unknown as Email[],
      },
    };
  }
};
AuthEmail.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthEmail;
