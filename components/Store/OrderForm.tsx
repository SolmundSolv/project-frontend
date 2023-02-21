import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useStateContext } from "../../context/StateContext";

const OrderForm: NextPage = () => {
  const ctx = useStateContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const buildingRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const products: string[] = [];
    ctx?.cartItems.map((i) => products.push(i?.id ?? ""));
    const order = {
      customer: ctx?.user?.user.id ?? "",
      email: emailRef.current?.value,
      name: nameRef.current?.value,
      status: "cl9sfz1xz0003tk2se0jt74m6",
      phone: phoneRef.current?.value,
      price: ctx?.totalPrice && ctx?.days ? ctx?.totalPrice * ctx?.days : 0,
      items: products,
      rentDays: ctx?.days ?? 0,
      address: addressRef.current?.value,
      city: cityRef.current?.value,
      zip: zipRef.current?.value,
      country: countryRef.current?.value,
      building: buildingRef.current?.value,
      cartId: localStorage.getItem("cartId") ?? "",
    };
    const res = await fetch("http://localhost:3001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    if (res.ok) {
      const body = {
        email: emailRef.current?.value,
        template: "Order Recive",
        variables: {
          CLIENT_NAME: nameRef.current?.value,
          ORDER_NUMBER: data?.number,
          ORDER_DETAILS: ctx?.cartItems.map((i) => i?.name + "<br>"),
          ORDER_DATE: data?.createdAt.split("T")[0],
          TOTAL_AMOUNT: data?.price,
          CONTACT_EMAIL: "konradqxd@gmail.com",
        },
      };
      fetch("http://localhost:3001/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          localStorage.removeItem("cartId");
          router.push("/confirm/" + data.id);
        }
      });
    }
  }
  return (
    <form id="contact-form" onSubmit={onSubmit}>
      <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-800 sm:rounded-md">
        <div className="bg-white px-4 py-5 dark:bg-gray-600 sm:p-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Credenitals
          </h2>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={ctx?.user?.user.name}
                ref={nameRef}
                required
                autoComplete="name"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={ctx?.user?.user.email}
                ref={emailRef}
                required
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
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
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                defaultValue={ctx?.user?.user.phone}
                required
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
                ref={phoneRef}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 dark:bg-gray-600 sm:p-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Address
          </h2>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Street
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                defaultValue={ctx?.user?.user?.adress?.street}
                ref={addressRef}
                required
                autoComplete="street-address"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                defaultValue={ctx?.user?.user?.adress?.city}
                ref={cityRef}
                required
                autoComplete="city"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="building"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Building
              </label>
              <input
                type="text"
                name="building"
                id="building"
                defaultValue={ctx?.user?.user?.adress?.building}
                ref={buildingRef}
                required
                autoComplete="building"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="zip-code"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Zip/Postal Code
              </label>
              <input
                type="text"
                name="zip-code"
                id="zip-code"
                defaultValue={ctx?.user?.user?.adress?.zip}
                ref={zipRef}
                required
                autoComplete="zip-code"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-white"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={ctx?.user?.user?.adress?.country}
                ref={countryRef}
                required
                autoComplete="country"
                className="mt-1 block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-[#faa71a] focus:ring-[#faa71a] dark:bg-gray-400 dark:text-white sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right dark:bg-gray-600 sm:px-6">
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
