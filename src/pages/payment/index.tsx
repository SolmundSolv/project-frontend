import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, { ReactElement } from "react";
import { useStateContext } from "../../../context/StateContext";
import CheckoutForm from "./CheckoutForm";
import Layout from "../../../components/Store/Layout";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const stripePromise = loadStripe(
  "pk_test_51MejupB3Jsb0yKWKLl6QBVd44qXq41jGKc6OnDU7sE9td8TBhMI15nBfMdOfHdHSwNzUONFBUeEMHbdEfdwxtNnY00QvdhIoVf"
);

const Payment = ({
  orderId,
  days,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:3001/stripe/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({
        cartId: localStorage.getItem("cartId"),
        days: parseInt(days),
        orderId: orderId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
      });
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div className="flex min-h-screen items-center p-6 dark:bg-gray-600">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg bg-white p-6">
          <h3 className="mb-4 text-lg font-bold">Payment</h3>
          {clientSecret && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

Payment.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  orderId: string;
  days: string;
}> = async (ctx: GetServerSidePropsContext) => {
  const { orderId, days } = ctx.query as { orderId: string; days: string };
  return {
    props: {
      orderId,
      days,
    },
  };
};

export default Payment;
