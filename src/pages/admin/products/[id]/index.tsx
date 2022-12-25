import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import SimpleTable from "../../../../../components/Admin/SimpleTable";
import AddProduct from "./AddProduct";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  category: { name: string };
  isActivated: boolean;
};

type SingleProduct = {
  id: string;
  serialNumer: string;
  boughtAt: string;
  warranty: string;
  ProductStatus: { name: string };
};

const columnHelper = createColumnHelper<SingleProduct>();

//react table column def
const columns = [
  columnHelper.accessor("serialNumer", {
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    header: () => <span>Serial Number</span>,
  }),
  columnHelper.accessor("ProductStatus.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
  }),
  columnHelper.accessor("boughtAt", {
    cell: (info) => info.getValue().slice(0, -14),
    header: () => <span>Bought At</span>,
  }),
  columnHelper.accessor("warranty", {
    cell: (info) => <div>{info.getValue == null && "No warranty"}</div>,
    header: () => <span>Warranty</span>,
  }),
];

const ExactProduct = ({
  product,
  all,
  status,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  if (!all) all = [];
  return (
    <div className="p-6">
      <h1>{product?.name}</h1>
      <h2>{product?.price}</h2>
      <h3>{product?.description}</h3>
      <h4>{product?.category?.name}</h4>
      <img src={`/img/${product?.img}`} alt={product?.name} />
      <div>
        <div className="flex justify-between">
          <h1 className="mt-6 mb-2 text-2xl font-bold text-gray-900">
            All products
          </h1>
        </div>
        <button
          className="mt-6 mb-2 rounded bg-green-500 px-4 py-2 font-bold text-white"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
        <SimpleTable columns={columns} tableData={all} />
      </div>
      <AddProduct open={open} setOpen={setOpen} status={status} />
    </div>
  );
};

ExactProduct.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  product: Product;
  all: SingleProduct[];
  status: { id: string; name: string }[];
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const res = await fetch(`http://localhost:3001/model/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await res.json();
  const res2 = await fetch(`http://localhost:3001/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const all = await res2.json();
  const res3 = await fetch(`http://localhost:3001/product/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const status = await res3.json();
  return { props: { product, all, status } };
};

export default ExactProduct;
