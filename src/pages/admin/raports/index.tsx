import { Tab } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { Fragment, ReactElement } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import withAuth from "../WithAuth";
import MaitenanceRaport from "./Maintenance";
import ProductsRaport from "./Products";
import Revenue from "./Revenue";

const RaportsPage = () => {
  const [from, setFrom] = React.useState<Date>(new Date());
  const [to, setTo] = React.useState<Date>(new Date());
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-6">
      <Tab.Group>
        <Tab.List className="flex w-full gap-2">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  (selected ? "-translate-y-1 bg-blue-100 " : "bg-white ") +
                  "rounded-t-lg border p-2 font-medium text-gray-700"
                }
              >
                Revenue
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  (selected ? "-translate-y-1 bg-blue-100 " : "bg-white ") +
                  "rounded-t-lg border p-2 font-medium text-gray-700"
                }
              >
                Products
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  (selected ? "-translate-y-1 bg-blue-100 " : "bg-white ") +
                  "rounded-t-lg border p-2 font-medium text-gray-700"
                }
              >
                Maintenance
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={"bg-white p-6"}>
            <div className="flex gap-2">
              <div className="flex w-full justify-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">From:</span>
                  <input
                    type="date"
                    value={from.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setFrom(new Date(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">To:</span>
                  <input
                    type="date"
                    value={to.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setTo(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <Revenue from={from} to={to} />
          </Tab.Panel>
          <Tab.Panel className={"bg-white p-6"}>
            <div className="flex gap-2">
              <div className="flex w-full justify-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">From:</span>
                  <input
                    type="date"
                    value={from.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setFrom(new Date(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">To:</span>
                  <input
                    type="date"
                    value={to.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setTo(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <ProductsRaport from={from} to={to} />
          </Tab.Panel>
          <Tab.Panel className={"bg-white p-6"}>
            <div className="flex gap-2">
              <div className="flex w-full justify-center gap-2">
                <div className="flex flex-col gap-2">
                  <span className="font-bold">From:</span>
                  <input
                    type="date"
                    value={from.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setFrom(new Date(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">To:</span>
                  <input
                    type="date"
                    value={to.toISOString().split("T")[0]}
                    className="w-fit"
                    onChange={(e) => setTo(new Date(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <MaitenanceRaport from={from} to={to} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const AuthRaportsPage = withAuth(RaportsPage);

AuthRaportsPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthRaportsPage;
