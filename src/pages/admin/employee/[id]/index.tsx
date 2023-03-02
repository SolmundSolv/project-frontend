import { createColumnHelper } from "@tanstack/react-table";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { useState } from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import Table from "../../../../../components/Admin/Table";
import type { Employee } from "../../../../types/responses";
import ChangeRole from "./ChangeRole";
import ViewTimeoffRequest from "../../profile/ViewTimeoffRequest";
import withAuth from "../../WithAuth";
import Edit from "./Edit";
import LinkAccount from "./LinkAccount";

type Request = Employee["TimeOffRequest"] extends (infer U)[] ? U : never;

type Tasks = Employee["KanbanTask"] extends (infer U)[] ? U : never;
const columnHelperTasks = createColumnHelper<Tasks>();

const columnsTasks = [
  columnHelperTasks.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelperTasks.accessor("KanbanTaskLabel", {
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
  }),
];

const UserPage = ({
  employee,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [requestId, setRequestId] = useState("");

  const columnHelper = createColumnHelper<Request>();

  const columns = [
    columnHelper.accessor("start", {
      cell: (info) => info.getValue().split("T")[0],
      header: () => <span>Start</span>,
    }),
    columnHelper.accessor("end", {
      cell: (info) => info.getValue().split("T")[0],
      header: () => <span>End</span>,
    }),
    columnHelper.accessor("RequestStatus.name", {
      cell: (info) => info.getValue(),
      header: () => <span>Status</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            setOpen(true);
            setRequestId(info.getValue());
          }}
        >
          View
        </button>
      ),
      header: () => <span>Actions</span>,
    }),
  ];
  if (!employee) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="h-full bg-slate-100 p-6 px-24">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Employee Details</h1>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
            onClick={() => setOpen4(true)}
          >
            Link Account
          </button>
          <LinkAccount id={employee.id} open={open4} setOpen={setOpen4} />
        </div>
        <div className="mt-8 grid h-full grid-cols-[1fr,_2fr] gap-8">
          <div className="flex h-full w-full flex-col rounded-xl bg-white p-6 shadow-xl">
            <button
              className="w-fit self-end rounded bg-blue-500 px-4 py-2 font-bold text-white"
              onClick={() => setOpen3(true)}
            >
              Edit
            </button>
            <Edit open={open3} setOpen={setOpen3} employee={employee} />
            <div className="mt-20 max-w-sm overflow-hidden">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-500">
                <img
                  className="h-full w-full object-cover"
                  src={
                    employee.avatar === "placeholder.png"
                      ? "http://localhost:3001/image/placeholder.png"
                      : employee.avatar
                  }
                  alt="User avatar"
                />
              </div>
              <div className="items-center px-6 py-4 font-semibold">
                <div className="flex flex-col items-center">
                  <div className="mb-2 text-center text-xl font-bold text-gray-800">
                    {employee.name}
                  </div>
                  <div className="text-center text-base font-bold text-gray-400">
                    {employee.role?.name}
                  </div>
                  <button
                    className="mb-2 text-center text-sm text-blue-400 hover:underline"
                    onClick={() => setOpen2(true)}
                  >
                    Change Role
                  </button>
                  <ChangeRole
                    open={open2}
                    setOpen={setOpen2}
                    id={employee.id}
                  />
                </div>
                <div className="my-6 border-b border-b-gray-200 pb-8 text-xl font-semibold">
                  Details
                </div>
                <div className="mb-2 grid text-gray-800">
                  <span className="font-semibold">Account ID</span>
                  <span className="text-gray-400">ID-{employee.id}</span>
                </div>
                <div className="mb-2 grid text-gray-800">
                  <span className="font-semibold">Email</span>
                  <span className="text-gray-400">{employee.email}</span>
                </div>
                <div className="mb-2 grid text-gray-800">
                  <span className="font-semibold">Phone</span>
                  <span className="text-gray-400">{employee.phone}</span>
                </div>
                <div className="mb-2 grid text-gray-800">
                  <span className="font-semibold">Address</span>
                  <span className="text-gray-400">{employee.address}</span>
                  <span className="text-gray-400">
                    {employee.city + " " + employee.zip}
                  </span>
                  <span className="text-gray-400">{employee.country}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-row gap-6">
            <div className="w-full rounded-xl bg-white p-6 shadow-xl">
              <h3 className="text-2xl font-bold">Time Off Request</h3>
              <Table columns={columns} tableData={employee.TimeOffRequest} />
              <ViewTimeoffRequest
                open={open}
                setOpen={setOpen}
                request={
                  employee.TimeOffRequest.find(
                    (request) => request.id === requestId
                  ) as Request
                }
              />
            </div>
            <div className="mt-6 flex flex-col rounded-lg bg-white p-6 shadow-xl">
              <h3 className="text-2xl font-bold">Task</h3>
              <Table columns={columnsTasks} tableData={employee?.KanbanTask} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const AuthUserPage = withAuth(UserPage);
AuthUserPage.getLayout = (
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export const getServerSideProps: GetServerSideProps<{
  employee: Employee;
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query as { id: string };
  const res = await fetch(`http://localhost:3001/employee/${id}`, {
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

export default AuthUserPage;
