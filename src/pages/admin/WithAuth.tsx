import React, { useEffect } from "react";
import Router from "next/router";
import { useStateContext } from "../../../context/StateContext";
import type { NextComponentType } from "next/types";
import { NextPageWithLayout } from "../_app";
import { Dialog } from "@headlessui/react";

interface WithAuthProps {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
}

const withAuth = (WrappedComponent: NextPageWithLayout<any>) => {
  const WithAuth: NextPageWithLayout<any> & WithAuthProps = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const ctx = useStateContext();
    useEffect(() => {
      const checkLogin = async () => {
        if (!ctx?.user?.user) {
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
            <h1 className="text-2xl font-bold">You are not logged in</h1>
            <button
              className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => {
                Router.push("/signin?callbackUrl=" + Router.asPath);
              }}
            >
              Login
            </button>
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
