import { Transition, Dialog } from "@headlessui/react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";

const AddProduct = ({
  open,
  setOpen,
  status,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  status: { id: string; name: string }[];
}): JSX.Element => {
  const serialRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    fetch("http://localhost:3001/product", {
      method: "POST",
      body: JSON.stringify({
        serial: serialRef.current?.value,
        date: dateRef.current?.value,
        status: statusRef.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col bg-white pb-12 shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <form
                  onSubmit={(e) => {
                    onSubmit(e);
                  }}
                >
                  <div className="grid grid-cols-1 grid-rows-[auto]">
                    <label htmlFor="serialNo" className="font-bold">
                      Serial Number
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"
                      ref={serialRef}
                    />
                    <label className="font-bold" htmlFor="date">
                      Bought At
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="date"
                      name="date"
                      id="date"
                      ref={dateRef}
                    />
                    <label className="font-bold" htmlFor="status">
                      Status
                    </label>
                    <select
                      className="rounded-lg border-gray-300"
                      name="status"
                      id="status"
                      ref={statusRef}
                    >
                      {status?.map((res: { id: string; name: string }) => {
                        return (
                          <option value={res.id} key={res.id}>
                            {res.name}
                          </option>
                        );
                      })}
                    </select>

                    <button
                      type="submit"
                      className="mt-5 bg-violet-400 px-4 py-2"
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
export default AddProduct;
