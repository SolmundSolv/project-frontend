import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import { useState } from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import type { Employee } from "../../../../types/responses";

const UserPage = ({
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
          <h1 className="text-xl font-semibold">Employee Details</h1>
          <div className="flex flex-row space-x-2">
            <button className="rounded bg-white px-4 py-2 font-semibold shadow">
              Filter
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white">
              Create
            </button>
          </div>
        </div>
        <div className="mt-8 grid h-full grid-cols-[1fr,_2fr] gap-8">
          <div className="h-full w-full rounded-xl bg-white p-6 shadow-xl">
            <div className="mt-20 max-w-sm overflow-hidden">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-500">
                <img
                  className="h-full w-full object-cover"
                  src={employee.avatar}
                  alt="User avatar"
                />
              </div>
              <div className="items-center px-6 py-4 font-semibold">
                <div className="mb-2 text-center text-xl font-bold text-gray-800">
                  {employee.name}
                </div>
                <div className="mb-2 text-center text-base font-bold text-gray-400">
                  {employee.role?.name}
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
          <div className="h-full w-full rounded-xl bg-white p-6 shadow-xl">
            <span>Time Off Request</span>
          </div>
        </div>
      </div>
    </>
  );
};
//eslint-disable-next-line
//@ts-ignore
UserPage.getLayout = (
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

export default UserPage;
