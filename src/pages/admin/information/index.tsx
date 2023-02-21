import { createColumnHelper } from "@tanstack/react-table";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";

const columnHelper = createColumnHelper<{
  id: string;
  name: string;
  value: string;
}>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("value", {
    cell: (info) => info.getValue(),
    header: () => <span>Value</span>,
  }),
  columnHelper.accessor("id", {
    cell: (info) => {
      return (
        <button
          type="button"
          onClick={() => {
            fetch(`http://localhost:3001/page/info/${info.getValue()}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });
          }}
          className="bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        >
          X
        </button>
      );
    },
    header: () => <span>Delete</span>,
  }),
];

const Information = ({
  info,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const valueRef = React.useRef<HTMLInputElement>(null);
  const [data, setData] = React.useState(info);
  React.useEffect(() => {
    setData(info);
  }, [info]);

  return (
    <div className="m-6 bg-white p-6">
      <h1 className="text-2xl font-bold">Information</h1>
      <div className=" grid grid-cols-2 gap-6">
        <Table columns={columns} tableData={data} />
        <div className="flex flex-col">
          <h3 className="mb-4 text-center font-bold">Add or Update</h3>
          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              fetch(`http://localhost:3001/page/info`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: nameRef?.current?.value,
                  value: valueRef?.current?.value,
                }),
              }).then((res) => {
                if (res.ok) {
                  window.location.reload();
                }
              });
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              ref={nameRef}
              className="rounded-lg border-2 border-gray-300 p-2"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              required
              ref={valueRef}
              className="rounded-lg border-2 border-gray-300 p-2"
            />
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  info: {
    id: string;
    name: string;
    value: string;
  }[];
}> = async () => {
  const res1 = await fetch(`http://localhost:3001/page/info`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const info = await res1.json();
  return {
    props: {
      info,
    },
  };
};

const AuthInformation = withAuth(Information);

AuthInformation.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default AuthInformation;
