import { NextPage } from "next";
import React, { useRef } from "react";
import { useStateContext } from "../../context/StateContext";
import { trpc } from "../../src/utils/trpc";

const OrderForm: NextPage = () => {
    const ctx = useStateContext();
    const nameRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const mutation = trpc.order.create.useMutation();

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formData = {};
        if (nameRef.current && companyRef.current && emailRef.current && phoneRef.current) {
            formData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                company: companyRef.current.value,
                content: phoneRef.current.value,
                items: ctx?.cartItems,
            };
        }

        const products: string[] = [];
        ctx?.cartItems.map((i) => products.push(i?.id ?? ""));
        console.log(products);
        mutation.mutate({
            number: 2,
            contractor: "cl9sf91900002tk2sv350dhti",
            price: ctx?.totalPrice ?? 0,
            status: "cl9sfz1xz0003tk2se0jt74m6",
            products: products,
        });

        const hxr = new XMLHttpRequest();
        hxr.open("POST", "/api/confirmOrder");
        hxr.setRequestHeader("content-type", "application/json");
        hxr.onload = function () {
            if (hxr.responseText == "success") {
                alert("Email sent");
            } else {
                alert("Something goes wrong");
            }
        };
        hxr.send(JSON.stringify(formData));
    }
    return (
        <form id="contact-form" onSubmit={onSubmit}>
            <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 dark:bg-gray-500 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                ref={nameRef}
                                required
                                autoComplete="name"
                                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                ref={emailRef}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Company
                            </label>
                            <input
                                type="text"
                                name="company"
                                id="company"
                                ref={companyRef}
                                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-white">
                                Phone
                            </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
                                ref={phoneRef}
                            />
                        </div>
                        <span className="col-span-3 text-sm font-medium text-gray-600 dark:text-white">123</span>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-500 sm:px-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-[#faa71a] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#faa71a] focus:outline-none focus:ring-2 focus:ring-[#faa71a] focus:ring-offset-2"
                    >
                        Order
                    </button>
                </div>
            </div>
        </form>
    );
};

export default OrderForm;
