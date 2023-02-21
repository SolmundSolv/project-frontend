import type { ReactElement } from "react";
import { useStateContext } from "../../../context/StateContext";
import Layout from "../../../components/Store/Layout";
import Image from "next/image";
import type { Product } from "../../types/responses";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import Link from "next/link";
const ProductPage = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ctx = useStateContext();
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="grid min-h-screen gap-4 bg-slate-50 p-6 dark:bg-gray-600 lg:grid-cols-2">
      <div>
        <Image
          src={`http://localhost:3001/image/${product.img}`}
          alt={product?.img}
          width={800}
          height={800}
          className="mx-auto w-full rounded-lg object-cover object-center shadow-md"
        />
      </div>
      <div className="h-fit rounded-md bg-white p-6 shadow-md dark:bg-gray-500">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 underline underline-offset-8 dark:text-white sm:text-3xl">
          {product?.name}
        </h1>
        <div className="mt-4">
          <span className="inline-flex text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-200">
            {product?.price}$ per day
          </span>
        </div>
        <div className="mt-4">
          <span className="inline-flex font-semibold tracking-wide text-gray-900 dark:text-white">
            {product?.description}
          </span>
        </div>
        <div className="mt-8 flex flex-grow flex-col gap-6">
          <button
            className="flex-grow rounded-xl border-2 border-yellow-400 bg-white px-8 py-2 font-bold text-yellow-400"
            onClick={() => ctx?.onAdd(product)}
          >
            Add to cart
          </button>
          <Link
            href="/cart"
            className="flex-grow rounded-xl border-2  border-yellow-400 bg-yellow-400 px-8 py-2 text-center font-bold text-white"
            onClick={() => ctx?.onAdd(product)}
          >
            Order now
          </Link>
        </div>
        <div className="mt-4">
          <span className="inline-flex font-semibold tracking-wide text-gray-500 dark:text-white">
            Available quantity: {product?.availableQuantity}
          </span>
        </div>
        <div className="mt-4">
          <span className="inline-flex text-lg font-semibold tracking-wide text-gray-500 dark:text-white">
            Details:
          </span>
          {product?.ModelDetails?.map((option) => (
            <div
              key={option.id}
              className="flex w-full flex-row items-center justify-between rounded-md border-b border-gray-500 p-2 dark:border-gray-200"
            >
              <span className="font-bold dark:text-white">{option.name}</span>
              <span className="dark:text-white">{option.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
ProductPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default ProductPage;

export const getServerSideProps: GetServerSideProps<{
  product: Product;
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const res = await fetch(`http://localhost:3001/model/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
