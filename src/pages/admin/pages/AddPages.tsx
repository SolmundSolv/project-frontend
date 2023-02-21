import { Transition, Dialog } from "@headlessui/react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";

const AddPages = ({
  open,
  setOpen,
  types,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  types: { name: string }[];
}): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value;
    const href = urlRef.current?.value;
    const title = titleRef.current?.value;
    const type = typeRef.current?.value;
    const res = await fetch("http://localhost:3001/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        href: href,
        title: title,
        type: type,
      }),
    });
    const data = await res.json();
    console.log(data);
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
                    <label htmlFor="name" className="font-bold">
                      Name
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="name"
                      id="name"
                      ref={nameRef}
                    />
                    <label className="font-bold" htmlFor="URL">
                      URL
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="URL"
                      id="URL"
                      ref={urlRef}
                    />
                    <label className="font-bold" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="title"
                      id="title"
                      ref={titleRef}
                    />
                    <label className="font-bold" htmlFor="'type'">
                      Type
                    </label>
                    <select name="type" id="type" ref={typeRef}>
                      {types.map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                    </select>

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

export default AddPages;
