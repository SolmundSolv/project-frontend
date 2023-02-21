import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import ItemPicker from "./ItemPicker";
import { Order } from "../../../../types/responses";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../../../components/Admin/Table";
import { useRouter } from "next/router";
import withAuth from "../../WithAuth";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: { name: string };
  image: { url: string };
};

function deleteProductfromOrder(
  orderId: string,
  productId: string
): Promise<any> {
  return fetch(`http://localhost:3001/order/${orderId}/products/${productId}`, {
    method: "DELETE",
  }).then(() => window.location.reload());
}

function procideOrder(orderId: string): Promise<any> {
  return fetch(`http://localhost:3001/order/${orderId}/procide`, {
    method: "POST",
  }).then(() => window.location.reload());
}
function completeOrder(orderId: string): Promise<any> {
  return fetch(`http://localhost:3001/order/${orderId}/completed`, {
    method: "POST",
  }).then(() => window.location.reload());
}

type Products = Order["ProductHistory"] extends (infer U)[] ? U : never;

const columnHelper = createColumnHelper<Products>();

const columns = [
  columnHelper.accessor("Product.Model.name", {
    cell: (info) => (
      <div className="flex gap-2">
        <img
          src={`/img/${info.row.original.Product.Model.img}`}
          width="50"
          height="50"
          alt=""
        />{" "}
        <Link
          href={"/admin/equipment/" + info.row.original.Product.id}
          className="self-center"
        >
          {info.getValue()}
        </Link>
      </div>
    ),
    header: () => <span>Product</span>,
  }),
  columnHelper.accessor("Product.serialNumer", {
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
    header: () => <span>Product</span>,
  }),
  columnHelper.accessor("Product.Model.category.name", {
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor("Product.Model.price", {
    cell: (info) => <div className="text-right">${info.getValue()}</div>,
    header: () => <span>Price</span>,
  }),
];

const Order = ({
  order,
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  if (!order) return <div>Order not found</div>;
  return (
    <div className="h-full bg-slate-100">
      <div className=" flex justify-between space-x-4 p-6">
        <button
          onClick={() => {
            router.back();
          }}
          className="flex gap-2 rounded bg-blue-600 px-4 py-2 font-bold text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
        <div className="flex gap-4">
          {order.status?.name === "Waiting" ? (
            <>
              <button
                className="rounded bg-blue-600 px-4 py-2 font-bold text-white"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add product
              </button>
              <button
                className="rounded bg-green-600 px-4 py-2 font-bold text-white"
                onClick={() => {
                  procideOrder(order.id);
                }}
              >
                Procide
              </button>
            </>
          ) : order.status?.name === "In Progress" ? (
            <>
              <button
                className="rounded bg-blue-600 px-4 py-2 font-bold text-white"
                onClick={() => {
                  completeOrder(order.id);
                }}
              >
                Complete
              </button>
            </>
          ) : (
            <></>
          )}
          {order.status?.name === "Ended" ? (
            <></>
          ) : (
            <button className="rounded bg-red-600 px-4 py-2 font-bold text-white">
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6">
        <div className="grid h-full grid-cols-3 gap-8">
          <div className="mx-auto h-96 w-full rounded-lg border bg-white p-6 shadow-md">
            <span className="text-2xl font-bold text-gray-800">
              Order Details (#{order.number})
            </span>
            <div className="flex h-full flex-col justify-evenly">
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  Date Added
                </div>
                <div className="font-bold text-gray-500">
                  {order.createdAt.split("T")[0]}
                </div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Price
                </div>
                <div className="font-bold text-gray-500">{order.price}</div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  Status
                </div>
                <div className="font-bold text-gray-500">
                  {order?.status?.name}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-h-96 w-full rounded-lg border bg-white p-6 shadow-md ">
            <span className="text-2xl font-bold text-gray-800">
              Customer Details
            </span>
            <div className="flex h-full flex-col justify-evenly">
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  Name
                </div>
                <div className="font-bold text-gray-500">
                  {order.customer.name}
                </div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                  Phone
                </div>
                <div className="font-bold text-gray-500">
                  {order.customer.phone}
                </div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  Email
                </div>
                <div className="font-bold text-gray-500">
                  {order.customer.User?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-auto max-h-96 w-full max-w-xl rounded-lg border bg-white p-6 shadow-md ">
            <span className="text-2xl font-bold text-gray-800">
              Time of Renting
            </span>
            <div className="grid h-full grid-rows-3 items-center">
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex gap-4 font-semibold text-gray-400 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                  Start
                </div>
                <div className="font-bold text-gray-500">
                  {order?.rentStart ? order.rentStart.split("T")[0] : "Not set"}
                </div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  End
                </div>
                <div className="font-bold text-gray-500">
                  {order?.rentEnd ? order.rentEnd.split("T")[0] : "Not set"}
                </div>
              </div>
              <div className="flex h-full items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-4 font-semibold text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Long
                </div>
                <div className="font-bold text-gray-500">
                  {order.rentDays} days
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-white p-6 shadow-lg">
          <span className="text-2xl font-bold text-gray-800">
            Order #{order.number}
          </span>
          <Table columns={columns} tableData={order.ProductHistory} />
          <span className="text-right font-bold">Total: ${order.price}</span>
        </div>
      </div>

      <ItemPicker
        open={open}
        setOpen={setOpen}
        orderId={order.id}
        props={products}
      />
    </div>
  );
};

const AuthOrder = withAuth(Order);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AuthOrder.getLayout = (
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  order: Order;
  products: Product[];
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const res = await fetch(`http://localhost:3001/order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const order = await res.json();
  const res2 = await fetch(`http://localhost:3001/model`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await res2.json();
  return {
    props: {
      order,
      products,
    },
  };
};

export default AuthOrder;
