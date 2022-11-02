import { Transition, Dialog } from "@headlessui/react";
import type { inferProcedureOutput } from "@trpc/server";
import Link from "next/link";
import type {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
} from "react";
import React, { Fragment, useRef, useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import type { AppRouter } from "../../../server/trpc/router/_app";
import { trpc } from "../../../utils/trpc";
import type { NextPageWithLayout } from "../../_app";

const Products: NextPageWithLayout = () => {
  const { data: products } = trpc.product.all.useQuery();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AddForm open={open} setOpen={setOpen} />
      <button
        className="rounded-md bg-blue-500 px-8 py-2 font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Add
      </button>
      <table className="h-auto w-full table-fixed rounded-md text-white">
        <thead className="rounded-t-md border-b border-gray-200 bg-gray-800 text-left font-bold">
          <tr className="rounded-md">
            <th className="p-3">Number</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {products?.map(
            (res: inferProcedureOutput<AppRouter["product"]["byId"]>) => {
              return (
                <Link
                  href={"products/[id]"}
                  as={`products/${res?.id}`}
                  key={res?.id}
                >
                  <tr
                    key={res?.id}
                    className="cursor-pointer hover:bg-gray-400"
                  >
                    <td>{res?.name}</td>
                    <td>{res?.price.toString()}</td>
                    <td>{res?.description}</td>
                  </tr>
                </Link>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Products;

function AddForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
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
      adding.mutate({
        name: nameRef.current?.value ?? "",
        price: parseFloat(priceRef.current?.value ?? "0") ?? 0,
        img: selectedFile.name,
        description: descripionRef.current?.value ?? "",
        categoryId: catRef.current?.value,
      });
      const formData = new FormData();
      formData.append("media", selectedFile);
      // formData.append("fileName", selectedFile.name);
      // const hxr = new XMLHttpRequest();
      // hxr.open("POST", "/api/uploadFile");
      // hxr.setRequestHeader("content-type", "multipart/form-data");
      // hxr.onload = function () {
      //     if (hxr.responseText == "success") {
      //         alert("Email sent");
      //     } else {
      //         alert("Something goes wrong");
      //     }
      // };
      // hxr.send(formData);
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
}
