import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import React from "react";
import AdminLayout from "../../../components/Admin/AdminLayout";
import withAuth from "./WithAuth";
const SingleBarChart = dynamic(
  () => import("../../../components/Admin/SingleBarChart"),
  {
    ssr: false,
  }
);

const Dashboard = ({
  ordersCount,
  revenue,
  productsCount,
  customersCount,
  maintenanceCount,
  maintenanceScheduledCount,
  maintenanceCost,
  maintenanceCompletedCount,
  chartData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="grid gap-4 p-6">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Last 30 Days:</h2>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="rounded-lg bg-red-500 p-4 font-bold text-white">
            <span>Orders</span>
            <div className="text-4xl">{ordersCount}</div>
          </div>
          <div className="rounded-lg bg-green-500 p-4 font-bold text-white">
            <span>Revenue</span>
            <div className="text-4xl">${revenue}</div>
          </div>
          <div className="rounded-lg bg-blue-500 p-4 font-bold text-white">
            <span>Products</span>
            <div className="text-4xl">{productsCount}</div>
          </div>
          <div className="rounded-lg bg-yellow-500 p-4 font-bold text-white">
            <span>Customers</span>
            <div className="text-4xl">{customersCount}</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Last 7 Days:</h2>
        <SingleBarChart chartData={chartData} />
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Maintenance:</h2>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="rounded-lg bg-red-500 p-4 font-bold text-white">
            <span>In progress</span>
            <div className="text-4xl">{maintenanceCount}</div>
          </div>
          <div className="rounded-lg bg-green-500 p-4 font-bold text-white">
            <span>Scheduled</span>
            <div className="text-4xl">{maintenanceScheduledCount}</div>
          </div>
          <div className="rounded-lg bg-blue-500 p-4 font-bold text-white">
            <span>Cost</span>
            <div className="text-4xl">${maintenanceCost}</div>
          </div>
          <div className="rounded-lg bg-yellow-500 p-4 font-bold text-white">
            <span>Completed</span>
            <div className="text-4xl">{maintenanceCompletedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  ordersCount: number;
  revenue: number;
  productsCount: number;
  customersCount: number;
  maintenanceCount: number;
  maintenanceScheduledCount: number;
  maintenanceCost: number;
  maintenanceCompletedCount: number;
  chartData: { name: string; amt: number }[];
}> = async () => {
  const res1 = await fetch(`${process.env.FETCH_URL}/order/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ordersCount = await res1.json();
  const res2 = await fetch(`${process.env.FETCH_URL}/order/revenue`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const revenue = await res2.json();
  const res3 = await fetch(`${process.env.FETCH_URL}/product/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const productsCount = await res3.json();

  const res4 = await fetch(`${process.env.FETCH_URL}/customers/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const customersCount = 0;

  const res5 = await fetch(
    `${process.env.FETCH_URL}/product/maintenance/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const maintenanceCount = await res5.json();

  const res6 = await fetch(
    `${process.env.FETCH_URL}/maintenance/scheduled/count`
  );
  const maintenanceScheduledCount = 0;

  const res7 = await fetch(
    `${process.env.FETCH_URL}/product/maintenance/cost`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const maintenanceCost = await res7.json();

  const res8 = await fetch(
    `${process.env.FETCH_URL}/maintenance/completed/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const maintenanceCompletedCount = 0;
  const res9 = await fetch("http://localhost:3001/order/charts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const chartData = await res9.json();

  return {
    props: {
      ordersCount,
      revenue,
      productsCount,
      customersCount,
      maintenanceCount,
      maintenanceScheduledCount,
      maintenanceCost,
      maintenanceCompletedCount,
      chartData,
    },
  };
};

const Auth = withAuth(Dashboard);

Auth.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Auth;
