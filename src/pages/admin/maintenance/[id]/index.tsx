import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import Table from "../../../../../components/Admin/Table";
import type { Maintence, MaintenceDetail } from "../../../../types/responses";
import withAuth from "../../WithAuth";

const columnHelper = createColumnHelper<MaintenceDetail>();

const columns = [
  columnHelper.accessor("description", {
    id: "number",
    cell: (info) => info.getValue(),
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: () => <span>Price</span>,
  }),
];

const OneMaintenance = ({
  maintenance,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { id } = router.query;

  async function handleUpdate(status: string) {
    const res = await fetch(
      `http://localhost:3001/product/maintenance/${maintenance.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.json();
    if (res.ok) {
      router.push("/admin/maintenance");
    } else {
      alert("Something went wrong");
    }
  }

  if (!maintenance) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid gap-6 p-6">
      <div className="flex justify-between rounded-lg bg-white p-6 shadow-md">
        <span className="text-2xl font-bold">Maintenance #{id}</span>
        <div className="flex gap-4">
          {maintenance.maintenanceStatus.name !== ("Finnished" || "Failed") && (
            <>
              <button
                type="button"
                className="rounded-md bg-green-500 px-4 py-3 font-bold text-white"
                onClick={() => handleUpdate("Finnished")}
              >
                Complete
              </button>

              <button
                type="button"
                className="rounded-md bg-red-500 px-4 py-3 font-bold text-white"
                onClick={() => handleUpdate("Failed")}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="gap-6 rounded-lg bg-white p-6 shadow-md">
        <span className="text-2xl font-bold">General</span>
        <div className="mt-6 grid grid-flow-col-dense grid-rows-2 gap-6">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-400">Product</span>
            <Link
              href={"/admin/equipment/" + maintenance.Product.id}
              className="cursor-pointer font-semibold hover:underline"
            >
              {maintenance.Product.Model.name}
            </Link>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-400">Price</span>
            <span className="font-semibold">$ {maintenance.price}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-400">Status</span>
            <span className="font-semibold">
              {maintenance.maintenanceStatus.name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-400">Date</span>
            <span className="font-semibold">
              {maintenance.createdAt.split("T")[0]}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <span className="text-2xl font-bold">Dates</span>
          <div className="mt-6 grid h-fit grid-flow-col-dense grid-rows-2 gap-6">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                Start Date
              </span>
              <span className="font-semibold">
                {maintenance?.start?.split("T")[0] ?? "Not Started"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                Estimated time
              </span>
              <span className="font-semibold">
                {maintenance?.estimatedTime ?? "0"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                End Date
              </span>
              <span className="font-semibold">
                {maintenance?.endDate?.split("T")[0] ?? "Not Started"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-400">
                Created At
              </span>
              <span className="font-semibold">
                {maintenance.createdAt.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
        <div className="gap-6 rounded-lg bg-white p-6 shadow-md">
          <span className="text-2xl font-bold">Details</span>
          <Table columns={columns} tableData={maintenance.MaintenanceDetails} />
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <span className="text-2xl font-bold">Description</span>
        <p>{maintenance.description}</p>
      </div>
    </div>
  );
};

const AuthOneMaintenance = withAuth(OneMaintenance);
AuthOneMaintenance.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  maintenance: Maintence;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3001/product/maintenance/${id}`, {
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

export default AuthOneMaintenance;
