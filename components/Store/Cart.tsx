import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import React, { Fragment } from "react";
import { useStateContext } from "../../context/StateContext";

const Cart = ({ open, setOpen }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }) => {
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
                                <ul>
                                    {ctx?.cartItems.map((item, index: number) => (
                                        <li key={item?.id}>
                                            {index + 1} {item?.name}{" "}
                                            <button type="button" onClick={() => ctx.onRemove(item)}>
                                                X
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {ctx?.totalPrice}
                            <Link href="/cart" key="order">
                                <button type="button">Order</button>
                            </Link>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Cart;
