import React, { ReactElement } from "react";
import Layout from "../../../components/Store/Layout";
import { useStateContext } from "../../../context/StateContext";

const Account = () => {
  const ctx = useStateContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-600">
      <div className="mx-auto max-w-7xl p-6 sm:px-6 lg:p-8">
        <div className="overflow-hidden bg-white shadow dark:bg-gray-700 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
              Account
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Personal details and application.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-600">
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  {ctx?.user?.user.name}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  {ctx?.user?.user.email}
                </dd>
              </div>
            </dl>
            <dl>
              <div className="border-b border-gray-200 px-4 py-5 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Password
                </dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:col-span-2 sm:mt-0">
                  ********
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

Account.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Account;
