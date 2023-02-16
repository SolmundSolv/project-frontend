import Link from "next/link";
import { ReactElement } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import withAuth from "../WithAuth";

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="mt-6 flex gap-4 rounded-lg bg-white p-6 shadow-md">
        <div className="flex w-fit rounded-lg border p-4 align-middle font-semibold ">
          <Link
            href="/admin/settings/maintenance-status"
            className="flex flex-col justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            <span className="w-fit text-sm">Maintenance Status</span>
          </Link>
        </div>
        <div className="flex aspect-1 w-fit rounded-lg border p-4 align-middle font-semibold">
          <Link
            href="/admin/settings/product-status"
            className="flex flex-col justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            <span className="w-fit text-sm">Model Status</span>
          </Link>
        </div>
        <div className="flex w-fit rounded-lg border p-4 align-middle font-semibold">
          <Link
            href="/admin/settings/order-status"
            className="flex flex-col justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
              />
            </svg>
            <span className="w-fit text-sm">Order Status</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const AuthSettingsPage = withAuth(SettingsPage);

AuthSettingsPage.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthSettingsPage;
