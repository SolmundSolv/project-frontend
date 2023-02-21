import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { ChangeEvent, ReactElement, useEffect } from "react";
import { useRef, useState } from "react";
import React from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import { useRouter } from "next/router";
import type { Equipment, Maintence } from "../../../../types/responses";
import MaintenanceForm from "./MaintenanceForm";
import Link from "next/link";
import withAuth from "../../WithAuth";

const EquipmentPage = ({
  product,
  maintence,
  maintenanceStatus,
  history,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [status, setStatus] = useState<string>(product?.ProductStatus.name);
  const nameRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("bg-gray-500");

  useEffect(() => {
    setColor(colorStatus(status, 500));
  }, [status]);

  function colorStatus(status: string, number: number) {
    switch (status) {
      case "Finnished":
      case "Avaliable":
        return `bg-green-${number} text-green-500`;
      case "In progress":
      case "In use":
        return `bg-yellow-${number} text-yellow-500`;
      case "In repair":
      case "Broken":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }
  async function handleUpdate() {
    const res = await fetch(
      "http://localhost:3001/product/model/" + product.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          serialNumber: nameRef.current?.value,
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      router.reload();
    } else {
      if (res.status === 400) {
        alert("You must enter a serial number");
      } else {
        alert(res.statusText);
      }
    }
  }
  if (!product) return <div>loading...</div>;
  if (!maintence) return <div>loading...</div>;
  if (!maintenanceStatus) return <div>loading...</div>;
  return (
    <div className="grid grid-cols-[300px,_1fr] gap-6 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">Thumbnail</span>
          <Image
            src={"http://localhost:3001/image/" + product?.Model.img}
            alt="product"
            width={300}
            height={300}
            className="mx-auto mt-6 w-auto rounded-lg object-cover object-center shadow-md"
          />
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Status</span>
            <div
              className={
                "aspect-1 h-4 place-self-center rounded-full " +
                colorStatus(status, 500)
              }
            ></div>
          </div>
          <select
            name=""
            id=""
            defaultValue={product?.productStatusId}
            className="mt-6 w-full rounded-lg"
            onChange={(e) => {
              setStatus(
                product.statuses.find((status) => status.id == e.target.value)
                  ?.name ?? "Unknown"
              );
            }}
          >
            {product?.statuses.map((status) => {
              return (
                <option value={status.id} key={status.id}>
                  {status.name}
                </option>
              );
            })}
          </select>
          <span className="mx-auto mt-6 text-center text-sm text-gray-400">
            Set the product status. If the product is inactive, it will not be
            displayed on the website
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">General</span>
            <div className="flex gap-4">
              <button
                className="rounded-lg bg-green-500 py-2 px-4 font-bold text-white"
                onClick={() => setOpen(!open)}
              >
                Maintenance
              </button>
              <MaintenanceForm
                open={open}
                setOpen={setOpen}
                id={product.id}
                statuses={maintenanceStatus}
              />
              <button
                className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
                onClick={() => handleUpdate()}
              >
                Save
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-flow-col-dense grid-rows-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">Name</span>
              <Link
                href={"/admin/products/" + product.Model.id}
                className="cursor-pointer font-semibold hover:underline"
              >
                {product.Model.name}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Serial Number
              </span>
              <span className="font-semibold">{product.serialNumer}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">Price</span>
              <span className="font-semibold">$ {product.Model.price}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Bought
              </span>
              <span className="font-semibold">
                {product.boughtAt.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">History of Maintenance</span>
          <table className="w-full table-fixed">
            {maintence.map((item, index) => (
              <tr className="border-b border-gray-200 p-5" key={index}>
                <td className="py-2">
                  <Link
                    href={"/admin/maintenance/" + item.id}
                    className="cursor-pointer font-semibold text-gray-700 hover:underline"
                  >
                    Maintenance
                  </Link>
                </td>
                <td>
                  <span
                    className={
                      " w-fit rounded-lg px-2 py-1 text-sm font-semibold"
                    }
                  >
                    {item.maintenanceStatus.name}
                  </span>
                </td>
                <td>
                  <span className="font-semibold text-gray-700">
                    $ {item.price}
                  </span>
                </td>
                <td>
                  <span className="font-semibold text-gray-700">
                    {item.createdAt.split("T")[0]}
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">History of Orders</span>
          <table className="mt-2 w-full table-fixed">
            {history.map((item, index) => (
              <tr className="border-b border-gray-200 p-5" key={index}>
                <td className="py-2">
                  <Link
                    href={"/admin/orders/" + item.Order.id}
                    className="cursor-pointer font-semibold text-gray-700 hover:underline"
                  >
                    Order #{item.Order.number}
                  </Link>
                </td>
                <td>
                  <span className="font-semibold text-gray-700">
                    {item.Order.createdAt.split("T")[0]}
                  </span>
                </td>
                <td>
                  <span className="font-semibold text-gray-700">
                    {item.Order.rentDays} days
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">Details</span>
          <div className="mt-6 grid grid-flow-col-dense grid-rows-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Maintence time
              </span>
              <span className="font-semibold">{product?.lastMaintance}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Maintence cost
              </span>
              <span className="font-semibold">
                $ {product?.sumOfMaintanceCost}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Number of orders
              </span>
              <span className="font-semibold">{product?.numberOfOrders}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Last order:{" "}
              </span>
              <span className="font-semibold">
                {product?.lastOrder.split("T")[0]}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-400">
                Last maintence:{" "}
              </span>
              <span className="font-semibold">
                {product?.lastMaintance.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthEquipmentPage = withAuth(EquipmentPage);

AuthEquipmentPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export const getServerSideProps: GetServerSideProps<{
  product: Equipment;
  maintence: Maintence[];
  maintenanceStatus: { id: string; name: string }[];
  history: {
    id: string;
    Order: {
      id: string;
      number: string;
      createdAt: string;
      price: number;
      rentDays: number;
    };
  }[];
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const res = await fetch(`http://localhost:3001/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await res.json();
  const res2 = await fetch(
    `http://localhost:3001/product/product-maintence/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const maintence = await res2.json();
  const res3 = await fetch(`http://localhost:3001/product/maintenance/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const maintenanceStatus = await res3.json();

  const res4 = await fetch(`http://localhost:3001/product/history/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const history = await res4.json();

  return { props: { product, maintence, maintenanceStatus, history } };
};

export default AuthEquipmentPage;
