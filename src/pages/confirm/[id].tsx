import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";
import Layout from "../../../components/Store/Layout";
import type { Order } from "../../types/responses";
import Image from "next/image";

const ConfirmationPage = ({
  order,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="flex min-h-screen justify-center bg-slate-500 p-6 align-middle dark:bg-gray-600 dark:text-white">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">Order Confirmation</h1>
        <p className="text-gray-700 dark:text-white">
          Thank you for your order. Your order details are as follows:
        </p>
        {/* Add the confirmation details here */}
        <div className="flex flex-col gap-2 rounded-lg bg-gray-700 p-6">
          <span className="flex gap-2 text-gray-700 dark:text-white">
            <p className="font-bold">Order Number:</p> #{order.number}
          </span>
          <span className="flex gap-2 text-gray-700 dark:text-white">
            <p className="font-bold">Order Time:</p> {order.rentDays}{" "}
            {order.rentDays > 1 ? "days" : "day"}
          </span>
          <span className="flex gap-2 text-gray-700 dark:text-white">
            <p className="font-bold">Order Date:</p>{" "}
            {order.createdAt.split("T")[0]}
          </span>
          <span className="flex gap-2 text-gray-700 dark:text-white">
            <p className="font-bold">Order Total:</p> $
            {order.price * order.rentDays}
          </span>
          {order.products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border-b bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-600"
            >
              <div className="flex items-center">
                <Image
                  src={"/img/" + product.Model.img}
                  alt={product.Model.name}
                  width={50}
                  height={50}
                  className="mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col ">
                  <span className="font-semibold text-gray-700 dark:text-white">
                    {product.Model.name}
                  </span>
                  <span className="text-gray-700 dark:text-white">
                    ${product.Model.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ConfirmationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ConfirmationPage;

export const getServerSideProps: GetServerSideProps<{
  order: Order;
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const res = await fetch(`http://localhost:3001/order/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const order = await res.json();

  return {
    props: {
      order,
    },
  };
};
