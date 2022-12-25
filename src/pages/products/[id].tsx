import type { ReactElement } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useStateContext } from "../../../context/StateContext";
import Layout from "../../../components/Store/Layout";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";
import { Product } from "../../types/responses";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const Product: NextPageWithLayout = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ctx = useStateContext();
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          {/* <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product?.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href="#" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {breadcrumb.name}
                                    </a>
                                    <svg width={16} height={20} viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-5 w-4 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600 dark:text-gray-200">
                                {product.name}
                            </a>
                        </li>
                    </ol> */}
        </nav>
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src={`/img/${product.img}`}
              alt={product?.img}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={`/img/${product.img}`}
                alt={product?.img}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <Image
                src={`/img/${product.img}`}
                alt={product?.img}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <Image
              src={`/img/${product.img}`}
              alt={product?.img}
              width={500}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
              $ {product?.price.toString()}
            </p>
            <div className="mt-8 flex flex-grow gap-6">
              <button
                className="flex-grow rounded-xl border-2 border-yellow-400 bg-white px-8 py-2 font-bold text-yellow-400"
                onClick={() => ctx?.onAdd(product)}
              >
                Add to cart
              </button>
              <button className="flex-grow rounded-xl border-2  border-yellow-400 bg-yellow-400 px-8 py-2 font-bold text-white">
                Buy now
              </button>
            </div>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 dark:text-white">
                  {product?.description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Highlights
              </h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  LIST
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                Details
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">DETAILS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Product.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Product;

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
