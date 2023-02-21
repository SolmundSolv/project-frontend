import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { useStateContext } from "../../../context/StateContext";

const EditForm = ({
  setOpen,
  open,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const ctx = useStateContext();
  const user = ctx?.user?.user;

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const phoneRef = React.useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3001/user/" + user?.id, {
      method: "PUT",
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        street: user?.adress?.street || "",
        city: user?.adress?.city || "",
        zip: user?.adress?.zip || "",
        country: user?.adress?.country || "",
        building: user?.adress?.building || "",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    });
  };

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
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">Your Information</h1>
                  <button
                    className="font-semibold dark:text-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col text-black">
                      <label
                        htmlFor="name"
                        className="font-semibold dark:text-gray-100"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={user?.name}
                        ref={nameRef}
                        required
                        className="rounded-md border-none bg-gray-100 p-2"
                      />

                      <label
                        className="font-semibold dark:text-gray-100"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        defaultValue={user?.email}
                        ref={emailRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />

                      <label
                        className="font-semibold dark:text-gray-100"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={user?.phone}
                        ref={phoneRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-yellow-400"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditForm;
