import { Transition, Dialog } from "@headlessui/react";
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import React, { Fragment, useRef, useState } from "react";
import { trpc } from "../../../utils/trpc";

const AddForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const adding = trpc.product.create.useMutation();
  const { data: category } = trpc.product.category.useQuery();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descripionRef = useRef<HTMLInputElement>(null);
  const catRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    setSelectedFile(event.target.files[0]);
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedFile) {
      fetch("http://localhost:3001/product", {
        method: "POST",
        body: JSON.stringify({
          name: nameRef.current?.value,
          price: parseInt(priceRef.current?.value ?? "0"),
          description: descripionRef.current?.value,
          category: catRef.current?.value,
          img: selectedFile.name,
          isActive: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // adding.mutate({
      //   name: nameRef.current?.value ?? "",
      //   price: parseFloat(priceRef.current?.value ?? "0") ?? 0,
      //   img: selectedFile.name,
      //   description: descripionRef.current?.value ?? "",
      //   categoryId: catRef.current?.value,
      // });
      const formData = new FormData();
      formData.append("media", selectedFile);

      fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });
      setOpen(false);

      formData.delete("media");
      // formData.delete("fileName");
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
            <Dialog.Panel className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 flex-col bg-white pb-12 shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6 ">
                <form
                  onSubmit={(e) => {
                    onSubmit(e);
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
                    <label className="font-bold" htmlFor="number">
                      Price
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="number"
                      name="price"
                      id="price"
                      ref={priceRef}
                    />
                    <label className="font-bold" htmlFor="description">
                      Description
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="text"
                      name="description"
                      id="description"
                      ref={descripionRef}
                    />
                    <label className="font-bold" htmlFor="category">
                      Category
                    </label>
                    <select
                      className="rounded-lg border-gray-300"
                      name="category"
                      id="category"
                      ref={catRef}
                    >
                      {category?.map((res: { id: string; name: string }) => {
                        return (
                          <option value={res.id} key={res.id}>
                            {res.name}
                          </option>
                        );
                      })}
                    </select>
                    <label className="font-bold" htmlFor="file">
                      Image
                    </label>
                    <input
                      className="rounded-lg border-gray-300"
                      type="file"
                      name="file"
                      id="file"
                      onChange={handleChange}
                      ref={fileRef}
                    />
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
export default AddForm;
