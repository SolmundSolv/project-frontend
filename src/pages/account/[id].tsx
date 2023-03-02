import type { ReactElement } from "react";
import React from "react";
import Layout from "../../../components/Store/Layout";
import { useStateContext } from "../../../context/StateContext";
import type { Order } from "../../types/responses";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import EditForm from "./EditForm";
import ChangePassword from "./ChangePassword";

const Account = () => {
  const ctx = useStateContext();
  const [orders, setOrders] = React.useState<Order[]>();
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const streetRef = React.useRef<HTMLInputElement>(null);
  const buildingRef = React.useRef<HTMLInputElement>(null);
  const cityRef = React.useRef<HTMLInputElement>(null);
  const numberRef = React.useRef<HTMLInputElement>(null);
  const zipRef = React.useRef<HTMLInputElement>(null);
  const countryRef = React.useRef<HTMLInputElement>(null);

  const user = ctx?.user?.user;

  React.useEffect(() => {
    if (user) {
      fetch("http://localhost:3001/order/user/" + user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        });
    }
  }, [user]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("http://localhost:3001/user/" + user?.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        building: buildingRef.current?.value,
        street: streetRef.current?.value,
        city: cityRef.current?.value,
        number: numberRef.current?.value,
        zip: zipRef.current?.value,
        country: countryRef.current?.value,
      }),
    }).then(() => {
      alert("Address Updated");
    });
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold dark:text-white">
          You are not logged in
        </h1>
        <Link
          href="/signin"
          className="inline-flex items-center rounded-md border border-transparent bg-yellow-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6 sm:px-6 lg:p-8">
        <div className="overflow-hidden bg-white shadow dark:bg-gray-700 sm:rounded-lg">
          <div className="flex justify-between px-4 py-5 sm:px-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                Account
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Personal details and application.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-gray-300 px-4 py-2 font-medium shadow-sm hover:bg-yellow-400 dark:bg-gray-500 dark:text-white"
                onClick={() => setEdit(true)}
              >
                Edit
              </button>
              <EditForm open={edit} setOpen={setEdit} />
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600">
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  {user.name}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  {user.phone}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0">
                  ********
                </dd>
                <dfn className="text-sm text-gray-500 dark:text-gray-400">
                  <button
                    className=" hover:text-yellow-400 dark:hover:text-gray-300"
                    onClick={() => setOpen2(true)}
                  >
                    Change password
                  </button>
                  <ChangePassword open={open2} setOpen={setOpen2} />
                </dfn>
              </div>
            </dl>
          </div>
        </div>
        <div className="overflow-hidden sm:rounded-lg">
          <div className="flex justify-between overflow-hidden bg-white px-4 py-5 shadow dark:bg-gray-700 sm:px-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                Orders
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Orders placed by you.
              </p>
            </div>
            <button
              className="rounded bg-gray-300 py-2 px-4 font-bold text-gray-800 dark:bg-gray-700 dark:text-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                )}
              </svg>
            </button>
          </div>
          <div className="overflow-hidden shadow-md">
            <Transition
              className="border-t border-gray-200 bg-white shadow transition-all duration-500 dark:border-gray-600 dark:bg-gray-700"
              show={open}
              enter="transition linear duration-1000"
              enterFrom="transform -translate-y-full"
              enterTo="transform -translate-y-0"
              leave="transition linear duration-1000"
              leaveFrom="transform -translate-y-0"
              leaveTo="transform -translate-y-full"
            >
              {loading ? (
                <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Loading...
                  </dt>
                </div>
              ) : (
                orders?.length !== 0 &&
                orders?.map((order) => (
                  <div
                    className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6"
                    key={order.id}
                  >
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Number: </span>
                      <span className="text-gray-600 dark:text-gray-300 ">
                        #{order.number}
                      </span>
                    </dt>
                    <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Price: </span>
                      <span className="text-gray-600 dark:text-gray-300 ">
                        {order.price} $
                      </span>
                    </dd>
                    <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Date: </span>
                      <span className="text-gray-600 dark:text-gray-300 ">
                        {order.createdAt.split("T")[0]}
                      </span>
                    </dd>
                    <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      <span>Status: </span>
                      <span className="text-gray-600 dark:text-gray-300 ">
                        {order.status.name}
                      </span>
                    </dd>
                  </div>
                ))
              )}
            </Transition>
          </div>
        </div>

        <div className="bg-white shadow dark:bg-gray-700 sm:rounded-lg ">
          <div className="flex justify-between px-4 py-5 sm:px-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                Shipping address
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                Update your shipping address.
              </p>
            </div>
            <label
              className="flex cursor-pointer items-center justify-center rounded bg-gray-300 px-4 font-medium hover:bg-yellow-400 dark:bg-gray-500 dark:text-white"
              htmlFor="submitBtn"
            >
              Update
            </label>
          </div>

          <div className="border-t border-gray-600 px-4 py-5 sm:px-6">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mt-1 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="street_address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street_address"
                    id="street_address"
                    autoComplete="street-address"
                    defaultValue={user.adress?.street}
                    ref={streetRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="city"
                    defaultValue={user.adress?.city}
                    ref={cityRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-1 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Building
                  </label>
                  <input
                    type="text"
                    name="building"
                    id="building"
                    autoComplete="address-line2"
                    defaultValue={user.adress?.building}
                    ref={buildingRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    ZIP / Postal
                  </label>
                  <input
                    type="text"
                    name="zip"
                    id="zip"
                    autoComplete="postal-code"
                    defaultValue={user.adress?.zip}
                    ref={zipRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    autoComplete="country-name"
                    defaultValue={user.adress?.country}
                    ref={countryRef}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100 sm:text-sm"
                  />
                </div>
              </div>
              <button
                className="hidden"
                type="submit"
                id="submitBtn"
                name="submitbtn"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Account.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Account;
