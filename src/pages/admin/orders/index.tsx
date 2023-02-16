import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import dynamic from "next/dynamic";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";
import useSWR from "swr";
import type { Order } from "../../../types/responses";
const SingleBarChart = dynamic(
  () => import("../../../../components/Admin/SingleBarChart"),
  {
    ssr: false,
  }
);

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("number", {
    cell: (info) => (
      <Link href={"orders/[id]"} as={`orders/${info.row.original.id}`}>
        {info.getValue()}
      </Link>
    ),
    header: () => <span>Number</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => <div className="text-right">{info.getValue()}</div>,
    header: () => <span>Product</span>,
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => (
      <div className="text-right">{info.getValue().split("T")[0]}</div>
    ),
    header: () => <span>Date</span>,
  }),
];

const Orders = ({
  inProgress,
  waiting,
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const fetcher = (url: string, method: string) =>
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  const {
    data: waitingData,
    error: waitingError,
    isLoading: waitingIsLoading,
  } = useSWR<Order[]>("http://localhost:3001/order/waiting", fetcher, {
    refreshInterval: 10000,
  });
  const {
    data: inProgressData,
    error: inProgressError,
    isLoading: inProgressIsLoading,
  } = useSWR<Order[]>("http://localhost:3001/order/in-progress", fetcher, {
    refreshInterval: 10000,
  });

  if (!inProgress || !waiting) return <div>Orders not found</div>;
  return (
    <div className="grid grid-cols-2 gap-6 bg-slate-100 p-6">
      <div className="col-span-2 p-6 pb-2 font-semibold">
        <Link
          href={"orders/all"}
          className={"rounded bg-blue-500 px-4 py-2 font-bold text-white"}
        >
          All orders
        </Link>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg ">
        <h1 className="mb-4 text-2xl font-semibold">Waiting:</h1>
        {waitingIsLoading ? (
          <div>Loading...</div>
        ) : waitingError ? (
          <div>Error</div>
        ) : (
          <Table columns={columns} tableData={waitingData as any} />
        )}
      </div>

      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold">In Progress:</h1>
        {inProgressIsLoading ? (
          <div>Loading...</div>
        ) : inProgressError ? (
          <div>Error</div>
        ) : (
          <Table columns={columns} tableData={inProgressData as any} />
        )}
      </div>
      <div className="col-span-2 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Last 7 days</h2>
        <SingleBarChart chartData={chartData} />
      </div>
    </div>
  );
};

const AuthOrders = withAuth(Orders);

AuthOrders.getLayout = (
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  inProgress: Order[];
  waiting: Order[];
  chartData: { name: string; amt: number }[];
}> = async () => {
  const res1 = await fetch("http://localhost:3001/order/in-progress", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const inProgress = await res1.json();
  const res2 = await fetch("http://localhost:3001/order/waiting", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const waiting = await res2.json();
  const res3 = await fetch("http://localhost:3001/order/charts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const chartData = await res3.json();
  return { props: { inProgress, waiting, chartData } };
};

export default AuthOrders;
