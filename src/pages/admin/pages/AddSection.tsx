import { Transition, Dialog } from "@headlessui/react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";

const AddSection = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLTextAreaElement>(null);
  const pathRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLSelectElement>(null);
  const [pages, setPages] = useState<{ id: string; name: string }[]>([]);
  const [selectedPage, setSelectedPage] = useState<{
    id: string;
  }>({ id: "" });
  React.useEffect(() => {
    fetch("http://localhost:3001/page")
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
      });
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const title = titleRef.current?.value;
    const value = valueRef.current?.value;
    const path = pathRef.current?.value;
    fetch("http://localhost:3001/page/section/" + selectedPage.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        value: value,
        iconPath: path,
      }),
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      } else {
        console.log("error");
      }
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
                      Title
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="name"
                      id="name"
                      ref={titleRef}
                    />
                    <label className="font-bold" htmlFor="icon">
                      Icon
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="icon"
                      id="icon"
                      ref={pathRef}
                    />
                    <label className="font-bold" htmlFor="title">
                      Page
                    </label>
                    <select
                      name="page"
                      id="page"
                      ref={pageRef}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setSelectedPage({
                          id: e.target.value,
                        });
                      }}
                    >
                      {pages.map((page) => (
                        <option key={page.id} value={page.id}>
                          {page.name}
                        </option>
                      ))}
                    </select>

                    <label className="font-bold" htmlFor="title">
                      Value
                    </label>
                    <textarea
                      className="rounded-lg border-gray-300"
                      name="title"
                      id="title"
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

export default AddSection;
