import { Transition, Dialog } from "@headlessui/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef } from "react";

const AddAttribute = ({
  open,
  setOpen,
  attributes,
  setAttributes,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  attributes: { name: string; value: string }[];
  setAttributes: Dispatch<SetStateAction<{ name: string; value: string }[]>>;
}): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  function handleAddAttribute(e: FormEvent) {
    e.preventDefault();
    if (nameRef.current?.value === "") return;
    if (valueRef.current?.value === "") return;
    setAttributes([
      ...attributes,
      {
        name: nameRef.current?.value ?? "",
        value: valueRef.current?.value ?? "",
      },
    ]);
    setOpen(false);
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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl ">
              <div className="p-6 ">
                <h1 className="text-2xl font-bold">Add Attribute</h1>
                <form
                  onSubmit={(e) => {
                    handleAddAttribute(e);
                  }}
                >
                  <div className="mt-6 grid grid-cols-1 grid-rows-[auto]">
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
                    <label className="font-bold" htmlFor="value">
                      Value
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="value"
                      id="value"
                      ref={valueRef}
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
export default AddAttribute;
