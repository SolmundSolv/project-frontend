import { Transition, Dialog } from "@headlessui/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef } from "react";
import { Employee } from "../../../../types/responses";

const Edit = ({
  open,
  setOpen,
  employee,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  employee: Employee;
}): JSX.Element => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/employee/" + employee.id, {
      method: "PATCH",
      body: JSON.stringify({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        address: addressRef.current?.value,
        city: cityRef.current?.value,
        zip: zipRef.current?.value,
        country: countryRef.current?.value,
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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white shadow-xl">
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
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={employee.name}
                      ref={nameRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="email" className="font-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue={employee.email}
                      ref={emailRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="phone" className="font-bold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      defaultValue={employee.phone}
                      ref={phoneRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="address" className="font-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      defaultValue={employee.address}
                      ref={addressRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="city" className="font-bold">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={employee.city}
                      ref={cityRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="zip" className="font-bold">
                      Zip
                    </label>

                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      defaultValue={employee.zip}
                      ref={zipRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
                    />
                    <label htmlFor="country" className="font-bold">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      defaultValue={employee.country}
                      ref={countryRef}
                      className="rounded-lg border-2 border-gray-300 p-2"
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
export default Edit;
