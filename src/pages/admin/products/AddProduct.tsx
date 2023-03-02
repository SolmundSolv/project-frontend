import { Transition, Dialog } from "@headlessui/react";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef } from "react";

type SingleProduct = {
  serialNumer: string;
  boughtAt: Date;
  warranty: string;
};

const AddProduct = ({
  open,
  setOpen,
  status,
  model,
  setModel,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  status: { id: string; name: string }[];
  model: string | SingleProduct[];
  setModel?: Dispatch<SetStateAction<SingleProduct[]>>;
}): JSX.Element => {
  const serialRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  let onSubmit: (e: FormEvent) => Promise<void>;

  if (typeof model === "string") {
    onSubmit = async (e: FormEvent) => {
      e.preventDefault();

      const res = await fetch("http://localhost:3001/product", {
        method: "POST",
        body: JSON.stringify({
          model: model,
          serialNumber: serialRef.current?.value,
          dateOfPurchase: dateRef.current?.valueAsDate,
          status: statusRef.current?.value,
          warranty: "2021-12-31",
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
    };
  } else {
    if (setModel) {
      onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setModel([
          ...model,
          {
            serialNumer: serialRef.current?.value || "",
            boughtAt: dateRef.current?.valueAsDate || new Date(),
            warranty: "2021-12-31",
          },
        ]);
      };
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
export default AddProduct;
