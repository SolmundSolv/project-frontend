import type { ReactElement } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useStateContext } from "../../../context/StateContext";
import Layout from "../../../components/Store/Layout";
import type { NextPageWithLayout } from "../_app";
import Image from "next/image";

const Product: NextPageWithLayout = () => {
  const ctx = useStateContext();
  const router = useRouter();
  const { id } = router.query;
  const { data: product, isLoading } = trpc.product.byId.useQuery({
    id: id?.toString() ?? "0",
  });
  if (isLoading || !product) return <div>Loading...</div>;

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
          <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 sm:overflow-hidden sm:rounded-lg">
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
            {/*      Reviews
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon key={rating} className={classNames(reviews.average > rating ? "text-gray-900" : "text-gray-200", "h-5 w-5 flex-shrink-0")} aria-hidden="true" />
                                    ))}
                                </div>
                                <p className="sr-only">{reviews.average} out of 5 stars</p>
                                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {reviews.totalCount} reviews
                                </a>
                                    </div>*/}
          </div>
          {/* Colors */}
          {/* <form className="mt-10">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                    <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                                    <div className="flex items-center space-x-3">
                                        {product.colors.map((color) => (
                                            <RadioGroup.Option
                                                key={color.name}
                                                value={color}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        color.selectedClass,
                                                        active && checked ? "ring ring-offset-1" : "",
                                                        !active && checked ? "ring-2" : "",
                                                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span" className="sr-only">
                                                    {" "}
                                                    {color.name}{" "}
                                                </RadioGroup.Label>
                                                <span aria-hidden="true" className={classNames(color.class, "h-8 w-8 rounded-full border border-black border-opacity-10")} />
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div> */}

          {/* Sizes */}
          {/* <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                    <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {product.sizes.map((size) => (
                                            <RadioGroup.Option
                                                key={size.name}
                                                value={size}
                                                disabled={!size.inStock}
                                                className={({ active }) =>
                                                    classNames(
                                                        size.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm" : "cursor-not-allowed bg-gray-50 text-gray-200",
                                                        active ? "ring-2 ring-indigo-500" : "",
                                                        "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                                    )
                                                }
                                            >
                                                {({ active, checked }) => (
                                                    <>
                                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                        {size.inStock ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? "border" : "border-2",
                                                                    checked ? "border-indigo-500" : "border-transparent",
                                                                    "pointer-events-none absolute -inset-px rounded-md"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                                <svg
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    stroke="currentColor"
                                                                >
                                                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div> 

                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to bag
                            </button>
                        </form>
                                                        </div> */}

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
