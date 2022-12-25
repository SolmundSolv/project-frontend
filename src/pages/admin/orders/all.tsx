import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import type { Order } from ".";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import SimpleTable from "../../../../components/Admin/SimpleTable";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("number", {
    id: "number",
    cell: (info) => (
      <Link href={`/admin/orders/${info.row.original.id}`}>
        {info.getValue()}
      </Link>
    ),
    header: () => <span>Number</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue()?.name,
    header: () => <span>Status</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().slice(0, -14),
    header: () => <span>Recived</span>,
  }),
];

const AllOrders = ({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  if (!orders) return <div>Orders not found</div>;
  return (
    <div className="p-6">
      <h1 className="mb-4 text-center text-2xl font-semibold">All Orders:</h1>
      <SimpleTable tableData={orders} columns={columns} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  orders: Order[];
}> = async () => {
  const res1 = await fetch("http://localhost:3001/order", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const orders = await res1.json();
  return { props: { orders } };
};

AllOrders.getLayout = (
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AllOrders;
