import { Transition, Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";
import { MaintenceDetail } from "../../../../types/responses";

const MaintenanceForm = ({
  open,
  setOpen,
  id,
  statuses,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
  statuses: { id: string; name: string }[];
}): JSX.Element => {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const daysRef = useRef<HTMLInputElement>(null);
  const [details, setDetails] = useState<MaintenceDetail[]>([]);
  const [status, setStatus] = useState<{ id: string }>({
    id: "",
  });
  const router = useRouter();
  const handleAddDetails = () => {
    setDetails([
      ...details,
      {
        id: (details.length + 1).toString(),
        description: "",
        price: 0,
        createdAt: "",
      },
    ]);
  };

  const handleTaskChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof MaintenceDetail
  ) => {
    const newDetails = [...details];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    newDetails[index][field] = event.target.value;
    setDetails(newDetails);
  };

  const handleDeleteDetails = (index: number) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/product/maintenance", {
        method: "POST",
        body: JSON.stringify({
          description: descriptionRef.current?.value,
          estimatedTime: parseInt(daysRef.current?.value || "0"),
          details: details.map((detail) => ({
            description: detail.description,
            price: detail.price,
          })),
          productId: id,
          maintenanceStatus: status.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status !== 201) {
        alert(data.message);
      } else {
        router.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Error: " + error);
    }
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
                        htmlFor="description"
                        className="font-semibold text-gray-600"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        ref={descriptionRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />
                      <label
                        htmlFor="days"
                        className="font-semibold text-gray-600"
                      >
                        Days
                      </label>
                      <input
                        type="number"
                        name="days"
                        id="days"
                        ref={daysRef}
                        className="rounded-md border-none bg-gray-100 p-2"
                      />
                      <label
                        htmlFor="status"
                        className="font-semibold text-gray-600"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="rounded-md border-none bg-gray-100 p-2"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setStatus({
                            id: e.target.value,
                          })
                        }
                      >
                        <option value="xxx" disabled>
                          Select Status
                        </option>
                        {statuses.map((status) => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>

                      <span className="mt-6 text-center font-semibold text-gray-600">
                        Details
                      </span>
                      <div className="grid max-h-80 overflow-auto">
                        {details.map((detail, index) => (
                          <div key={detail.id} className="flex flex-col">
                            <label
                              htmlFor="description"
                              className="font-semibold text-gray-600"
                            >
                              Description
                            </label>
                            <input
                              type="text"
                              name="description"
                              id={`description-${index}`}
                              onChange={(event) =>
                                handleTaskChange(event, index, "description")
                              }
                              className="rounded-md border-none bg-gray-100 p-2"
                            />
                            <label
                              htmlFor="price"
                              className="font-semibold text-gray-600"
                            >
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              id={`price-${index}`}
                              onChange={(event) =>
                                handleTaskChange(event, index, "price")
                              }
                              className="rounded-md border-none bg-gray-100 p-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteDetails(index)}
                              className="mt-2 rounded-md bg-red-500 px-4 py-3 font-semibold text-white"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleAddDetails}
                        type="button"
                        className="mt-2 rounded-md bg-blue-500 px-4 py-3 font-semibold text-white"
                      >
                        Add
                      </button>

                      <div className="mt-8 flex justify-center">
                        <button
                          type="button"
                          className="mr-2 rounded-md bg-gray-200 px-4 py-3 font-semibold text-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          Discard
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-blue-500 px-4 py-3 font-semibold text-white"
                        >
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
export default MaintenanceForm;
