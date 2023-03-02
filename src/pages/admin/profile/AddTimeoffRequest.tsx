import { Transition, Dialog } from "@headlessui/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef } from "react";

const AddTimeoffRequest = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}): JSX.Element => {
  const dateStartRef = useRef<HTMLInputElement>(null);
  const dateEndRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (dateStartRef.current?.value === undefined) {
      alert("Start date is required");
      return;
    }
    if (dateEndRef.current?.value === undefined) {
      alert("End date is required");
      return;
    }
    if (dateStartRef.current?.value > dateEndRef.current?.value) {
      alert("Start date must be before end date");
      return;
    }

    const res = await fetch("http://localhost:3001/employee/timeoffrequest", {
      method: "POST",
      body: JSON.stringify({
        employeeId: id,
        startDate: dateStartRef.current?.valueAsDate,
        endDate: dateEndRef.current?.valueAsDate,
        reason: reasonRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      window.location.reload();
    } else {
      console.log("error");
    }
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
                    <label htmlFor="start" className="font-bold">
                      From
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="date"
                      name="start"
                      ref={dateStartRef}
                    />
                    <label className="end" htmlFor="date">
                      To
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="date"
                      name="end"
                      ref={dateEndRef}
                    />
                    <label className="font-bold" htmlFor="status">
                      Reason
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="end"
                      ref={reasonRef}
                    />

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
export default AddTimeoffRequest;
