import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import type { Maintence } from "../../../types/responses";
import withAuth from "../WithAuth";

const columnHelper = createColumnHelper<Maintence>();

const columns = [
  columnHelper.accessor("id", {
    id: "number",
    cell: (info) => (
      <Link
        href={"/admin/maintenance/" + info.getValue()}
        className="text-left"
      >
        {info.getValue()}
      </Link>
    ),
    header: () => <span>id</span>,
  }),
  columnHelper.accessor("Product.Model.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Product</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: () => <span>price</span>,
  }),
  columnHelper.accessor("maintenanceStatus.name", {
    cell: (info) => info.getValue(),
    header: () => <span>status</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => info.getValue().split("T")[0],
    header: () => <span>Date</span>,
  }),
];

const AllMaintenance = ({
  maintenance,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  if (!maintenance) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <div className="gap-6 rounded-lg bg-white p-6 shadow-md ">
        <span className="text-2xl font-bold">Maintenance</span>
        <Table columns={columns} tableData={maintenance} />
      </div>
    </div>
  );
};

const AuthAllMaintenance = withAuth(AllMaintenance);

AuthAllMaintenance.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  maintenance: Maintence[];
}> = async () => {
  const res = await fetch("http://localhost:3001/product/maintenance/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const maintenance = await res.json();
  return {
    props: {
      maintenance,
    },
  };
};

export default AuthAllMaintenance;
