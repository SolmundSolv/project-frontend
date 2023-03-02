import React, { useEffect } from "react";
import Router from "next/router";
import { useStateContext } from "../../../context/StateContext";
import type { NextComponentType } from "next/types";
import { NextPageWithLayout } from "../_app";
import { Dialog } from "@headlessui/react";
import Link from "next/link";

interface WithAuthProps {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
}

const withAuth = (WrappedComponent: NextPageWithLayout<any>) => {
  const WithAuth: NextPageWithLayout<any> & WithAuthProps = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const ctx = useStateContext();
    useEffect(() => {
      const checkLogin = async () => {
        if (!ctx?.user?.user?.isEmployee) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      };

      checkLogin();
    }, [ctx]);
    if (!isLoggedIn) {
      return (
        <Dialog
          className="relative inset-0 z-[40] flex h-screen w-screen items-center justify-center"
          as="div"
          onClose={() => {
            Router.push("/signin");
          }}
          open={true}
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">
              You are not logged in or you are not employee
            </h1>
            <h3 className="text-sm font-medium text-gray-500">
              If you think this is mistake contact with administrator
            </h3>
            <div className="flex gap-2">
              <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={() => {
                  Router.push("/signin?callbackUrl=" + Router.asPath);
                }}
              >
                Login
              </button>
              <Link
                href={"/"}
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Dialog>
      );
    }

    return <WrappedComponent {...props} />;
  };

  // WithAuth.getInitialProps = async (ctx) => {
  //   const componentProps =
  //     WrappedComponent.getInitialProps &&
  //     (await WrappedComponent.getInitialProps(ctx));

  //   return { ...componentProps };
  // };

  return WithAuth;
};

export default withAuth;
