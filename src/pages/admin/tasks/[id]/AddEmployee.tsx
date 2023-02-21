import { Transition, Dialog } from "@headlessui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";

import React, { Fragment, useState } from "react";
import Table from "../../../../../components/Admin/Table";
import type { Employee } from "../../../../types/responses";

const AddEmpolyee = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}): JSX.Element => {
  const [employees, setEmployees] = useState<Employee[]>();
  React.useEffect(() => {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, [open]);

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor("avatar", {
      cell: (info) => (
        <Image
          src={info.getValue()}
          width={50}
          height={50}
          alt="user"
          className="rounded-full"
        />
      ),
      header: () => <span>Avatar</span>,
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("Position.name", {
      cell: (info) =>
        info.row.original.Position
          ? info.row.original.Position.name
          : "No position",
      header: () => <span>Position</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => handleAddEmployee(info.getValue())}
        >
          Add
        </button>
      ),
      header: () => <span>Add</span>,
    }),
  ];

  function handleAddEmployee(employeeId: string) {
    fetch(`http://localhost:3001/kanban/${id}/add/${employeeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) window.location.reload();
    });
  }
  if (!employees) return <div>Employee not found</div>;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Add Task</h1>
                    <button
                      className="font-semibold text-gray-600"
                      onClick={() => setOpen(false)}
                    >
                      X
                    </button>
                  </div>
                  <Table columns={columns} tableData={employees} />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddEmpolyee;
