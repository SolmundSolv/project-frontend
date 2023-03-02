import { Transition, Dialog } from "@headlessui/react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";

const AddForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [roles, setRoles] = React.useState<{ id: string; name: string }[]>();
  const roleRef = useRef<HTMLSelectElement>(null);

  React.useEffect(() => {
    fetch(`http://localhost:3001/employee/roles`)
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    fetch("http://localhost:3001/employee", {
      method: "POST",
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        address: addressRef.current?.value,
        city: cityRef.current?.value,
        zip: zipRef.current?.value,
        country: countryRef.current?.value,
        roleId: roleRef.current?.value,
        status: "active",
        avatar: "placeholder.jpg",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        window.location.reload();
      } else {
        console.log("error");
      }
    });
  }
  if (!roles) {
    return <></>;
  }

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
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold">Add User</h1>
                  <button
                    className="font-semibold text-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    X
                  </button>
                </div>
                <div className="p-6">
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-600"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        ref={nameRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />

                      <label
                        className="font-semibold text-gray-600"
                        htmlFor="email"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        ref={emailRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />

                      <label
                        className="font-semibold text-gray-600"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        ref={phoneRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />
                      <span className="mt-4 font-semibold">Address</span>
                      <div className="flex flex-col p-4">
                        <label
                          className="font-semibold text-gray-600"
                          htmlFor="address"
                        >
                          Street
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          ref={addressRef}
                          className="rounded-md border-none bg-gray-100 p-2"
                        />

                        <label
                          className="font-semibold text-gray-600"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          ref={cityRef}
                          className="rounded-md border-none bg-gray-100 p-2"
                        />

                        <label
                          className="font-semibold text-gray-600"
                          htmlFor="zip"
                        >
                          Zip
                        </label>
                        <input
                          type="text"
                          name="zip"
                          id="zip"
                          ref={zipRef}
                          className="rounded-md border-none bg-gray-100 p-2"
                        />

                        <label
                          className="font-semibold text-gray-600"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          ref={countryRef}
                          className="rounded-md border-none bg-gray-100 p-2"
                        />
                      </div>
                      <label
                        className="font-semibold text-gray-600"
                        htmlFor="role"
                      >
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        ref={roleRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      >
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      <div className="mt-8 flex justify-center">
                        <button
                          type="button"
                          className="mr-2 rounded-md bg-gray-200 px-4 py-3 font-semibold text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          Discard
                        </button>
                        <button className="rounded-md bg-blue-500 px-4 py-3 font-semibold text-white">
                          Submit
                        </button>
                      </div>
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
export default AddForm;
