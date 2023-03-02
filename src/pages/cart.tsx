import type { ReactElement } from "react";
import React from "react";
import Layout from "../../components/Store/Layout";
import OrderForm from "../../components/Store/OrderForm";
import { useStateContext } from "../../context/StateContext";
import type { NextPageWithLayout } from "./_app";
import Image from "next/image";

const Cart: NextPageWithLayout = () => {
  const ctx = useStateContext();
  if (ctx?.cartItems)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-600">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6 py-16 px-4 dark:text-white sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">CheckOut</h2>
          <div className="flex flex-col gap-4 rounded-lg bg-slate-100  p-6 shadow-md dark:bg-gray-700">
            <h4 className="mx-auto text-xl font-bold">Form</h4>
            <OrderForm />
          </div>

          <div className="flex flex-col gap-4 rounded-lg bg-slate-100  p-6 shadow-md dark:bg-gray-700">
            <h4 className="mx-auto text-xl font-bold">Cart</h4>
            <ul className="grid gap-2">
              {ctx?.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border-b bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-600"
                >
                  <div className="flex items-center">
                    <Image
                      src={"http://localhost:3001/image/" + item.img}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="mr-4 h-12 w-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm dark:text-gray-100">
                        {item.price} $
                      </p>
                    </div>
                    <button
                      onClick={() => ctx?.onRemove(item)}
                      className="font-bold text-red-500 hover:text-red-700"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </ul>
            <div className="grid gap-2">
              <div className="flex justify-between font-bold">
                <div className="flex gap-2">
                  <p>Days:</p>
                  <p>{ctx?.days}</p>
                </div>
                <div className="grid grid-flow-col ">
                  <button
                    onClick={() => ctx?.incrementDays()}
                    className="ml-2 h-8 w-8 rounded-lg bg-yellow-400 font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => ctx?.decrementDays()}
                    className="ml-2 h-8 w-8 rounded-lg bg-yellow-400 font-bold"
                  >
                    -
                  </button>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold">
                  <p>Price per day:</p>
                  <p>{ctx?.totalPrice} $</p>
                </div>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>{ctx?.totalPrice * ctx?.days} $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return <div>error</div>;
};

Cart.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Cart;
