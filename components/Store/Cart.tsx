import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import React, { Fragment } from "react";
import { useStateContext } from "../../context/StateContext";

const Cart = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const ctx = useStateContext();
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
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="absolute top-0 right-0 bottom-0 flex w-full max-w-md flex-col overflow-y-auto bg-white pb-12 shadow-xl dark:bg-gray-800 dark:text-white">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Cart</h2>
                  <div>
                    <span className="font-semibold dark:text-gray-200">
                      Days:{" "}
                    </span>
                    <input
                      type="number"
                      value={ctx?.days}
                      min="1"
                      max="60"
                      onChange={(e) => {
                        ctx?.setDays(parseInt(e.target.value));
                      }}
                      onBlur={(e) => {
                        if (e.target.value === "") ctx?.setDays(1);
                        if (parseInt(e.target.value) < 1) ctx?.setDays(1);
                        if (parseInt(e.target.value) > 60) ctx?.setDays(60);
                      }}
                      className="ml-2 h-10 w-16 rounded-lg border-none bg-gray-800 font-semibold dark:text-gray-200"
                    />
                    <button
                      onClick={() => ctx?.incrementDays()}
                      className="ml-2 h-10 w-10 rounded-lg bg-yellow-400 p-2 font-bold"
                    >
                      +
                    </button>
                    <button
                      onClick={() => ctx?.decrementDays()}
                      className="ml-2 h-10 w-10 rounded-lg bg-yellow-400 p-2 font-bold"
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="bg-white shadow-md dark:bg-gray-800">
                  {ctx?.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <Image
                          src={"/img/" + item.img}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="mr-4 h-12 w-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-lg font-medium">{item.name}</p>
                          <p className="text-sm dark:text-gray-100">
                            {item.price} $
                          </p>
                        </div>
                        <button
                          onClick={() => ctx?.onRemove(item)}
                          className="font-bold text-red-500 hover:text-red-700"
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between px-4 py-2 font-bold">
                    <p>Price per day:</p>
                    <p>{ctx?.totalPrice} $</p>
                  </div>
                  <div className="flex justify-between py-2 px-4 font-bold">
                    <p>Total:</p>
                    <p>
                      {ctx?.totalPrice && ctx?.days
                        ? ctx?.totalPrice * ctx?.days
                        : 0}{" "}
                      $
                    </p>
                  </div>
                </div>
                <Link href="/cart" key="order">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-yellow-400 py-2 font-bold"
                  >
                    Order
                  </button>
                </Link>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
