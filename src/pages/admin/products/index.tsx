import { createColumnHelper } from "@tanstack/react-table";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: { name: string };
};

const columnHelper = createColumnHelper<Product>();

//react table column def
const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Link
        href={"products/" + info.row.original.id}
        className="flex text-left"
      >
        {info.getValue()}
      </Link>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor("category.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Category</span>,
  }),
];

const Products = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  // const { data: products } = trpc.product.all.useQuery();
  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <span className="text-2xl font-bold">Products</span>
        <Link
          href={"products/add"}
          className="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white "
        >
          Add
        </Link>
      </div>
      <div className="mt-6 rounded-lg bg-white p-6 shadow-lg">
        <Table tableData={products} columns={columns} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
}> = async (ctx: GetServerSidePropsContext) => {
  // const session = await getServerAuthSession(ctx);
  // if (!session) {
  //   return {
  //     redirect: { destination: "/api/auth/signin", permanent: false },
  //     props: {},
  //   };
  const res = await fetch("http://localhost:3001/model", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await res.json();
  return { props: { products } };
};

const AuthProducts = withAuth(Products);

AuthProducts.getLayout = function getLayout(
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default AuthProducts;
