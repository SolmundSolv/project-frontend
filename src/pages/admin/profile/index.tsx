import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import { useStateContext } from "../../../../context/StateContext";
import type { Employee } from "../../../types/responses";
import withAuth from "../WithAuth";
import Image from "next/image";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../../components/Admin/Table";

type Incomes = Employee["Salary"] extends (infer U)[] ? U : never;
type Tasks = Employee["KanbanTask"] extends (infer U)[] ? U : never;

const columnHelperIncomes = createColumnHelper<Incomes>();
const columnHelperTasks = createColumnHelper<Tasks>();

const columnsIncomes = [
  columnHelperIncomes.accessor("basic", {
    id: "basic",
    cell: (info) => info.getValue(),
    header: () => <span>Basic</span>,
  }),
  columnHelperIncomes.accessor("bonus", {
    cell: (info) => info.getValue(),
    header: () => <span>Bonus</span>,
  }),
  columnHelperIncomes.accessor("Currency", {
    cell: (info) => info.getValue()?.status,
    header: () => <span>Currency</span>,
  }),
  columnHelperIncomes.accessor("payDate", {
    cell: (info) => info.getValue().split("T")[0],
    header: () => <span>Pay Date</span>,
  }),
  columnHelperIncomes.accessor("SalaryStatus.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
  }),
];

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

const ProfilePage = () => {
  const ctx = useStateContext();
  const user = ctx?.user?.user;
  const [employee, setEmployee] = React.useState<Employee>();
  React.useEffect(() => {
    fetch("http://localhost:3001/employee/" + user?.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
      });
  }, [user?.id]);
  if (!employee) return <div>Employee not found</div>;
  return (
    <div className="p-6">
      <div className="flex rounded-lg bg-white p-6 shadow-md">
        <Image
          src={employee?.avatar}
          width={200}
          height={200}
          alt={employee?.avatar}
        />
        <div className="ml-6">
          <div className="mb-2">
            <span className="text-lg font-medium text-gray-800">
              {employee?.name}
            </span>
          </div>
          <div className="mb-2 text-sm font-medium text-gray-500">
            {employee?.role.name} • {employee?.email}
          </div>
          <div className="mb-2 flex flex-col border border-gray-200 p-4">
            <div className="font-bold">
              {employee?.Salary.reduce((acc, cur) => acc + cur.basic, 0)} +{" "}
              {employee?.Salary.reduce((acc, cur) => acc + cur.bonus, 0)}{" "}
              {employee?.Salary[0]?.Currency.status}
            </div>
            <span className="font-medium text-gray-500">Income</span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col rounded-lg bg-white p-6 shadow-md">
        <h3 className="text-2xl font-bold">Incomes</h3>
        <Table columns={columnsIncomes} tableData={employee?.Salary} />
      </div>
      <div className="mt-6 flex flex-col rounded-lg bg-white p-6 shadow-md">
        <h3 className="text-2xl font-bold">Task</h3>
        <Table columns={columnsTasks} tableData={employee?.KanbanTask} />
      </div>
    </div>
  );
};

const AuthProfilePage = withAuth(ProfilePage);
AuthProfilePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AuthProfilePage;
