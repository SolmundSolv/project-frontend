import { Transition, Dialog } from "@headlessui/react";
import { createColumnHelper } from "@tanstack/react-table";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import Table from "../../../../../components/Admin/Table";

type Account = {
  id: string;
  email: string;
  name: string;
};

const LinkAccount = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) => {
  const [account, setAccount] = React.useState<Account[]>([]);

  const columnHelper = createColumnHelper<Account>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => (
        <div
          className="cursor-pointer hover:text-blue-700 hover:underline"
          onClick={() => {
            fetch(`http://localhost:3001/user/${id}/link`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                id: info.row.original.id,
              }),
            }).then(() => {
              setOpen(false);
            });
          }}
        >
          {info.getValue()}
        </div>
      ),
      header: "Name",
    }),
    columnHelper.accessor("email", {
      cell: (info) => <div>{info.getValue()}</div>,
      header: "Email",
    }),
  ];
  React.useEffect(() => {
    const getAccount = async () => {
      const res = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setAccount(data);
    };
    getAccount();
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 " onClose={setOpen}>
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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl">
              <div className="p-6 ">
                <Table columns={columns} tableData={account} />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LinkAccount;
