import { Transition, Dialog } from "@headlessui/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef } from "react";

const ViewTimeoffRequest = ({
  open,
  setOpen,
  request,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  request: {
    id: string;
    start: string;
    end: string;
    reason: string;
  };
}): JSX.Element => {
  const [status, setStatus] = React.useState("pending");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:3001/employee/timeoffrequest/procied",
      {
        method: "POST",
        body: JSON.stringify({
          id: request.id,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      window.location.reload();
    } else {
      console.log("error");
    }
  }
  if (!request) {
    return <></>;
  }

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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <form
                  onSubmit={(e) => {
                    onSubmit(e);
                    setOpen(false);
                  }}
                >
                  <div className="grid grid-cols-1 grid-rows-[auto]">
                    <span className="font-bold">Status:</span>
                    <span>{status}</span>
                    <span className="font-bold">Date:</span>
                    <span>
                      {request.start.split("T")[0]} -{" "}
                      {request.end.split("T")[0]}{" "}
                    </span>
                    <span className="font-bold">Reason:</span>
                    <span>{request.reason}</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white"
                        onClick={() => setStatus("Granted")}
                        type="button"
                      >
                        Approve
                      </button>
                      <button
                        className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white"
                        onClick={() => setStatus("Rejected")}
                        type="button"
                      >
                        Reject
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="mt-5 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ViewTimeoffRequest;
