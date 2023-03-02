import type { ReactElement } from "react";
import Layout from "../../components/Store/Layout";
import type { Product } from "../types/responses";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import Item from "../../components/Store/Item";
import Link from "next/link";
const Home = ({
  products,
  categories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!products || !categories) {
    return <div>loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto grid max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-8">
        <Image
          src="http://localhost:3001/image/banner.jpg"
          alt="banner"
          className="w-full object-cover"
          width={1920}
          height={600}
        />
        <div>
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold dark:text-white">
              Newest products
            </h3>
            <Link
              href="/all"
              className="text-md font-bold text-yellow-500 hover:underline dark:text-yellow-400"
            >
              See all
            </Link>
          </div>
          <div className="grid gap-2 p-2 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <Item key={product.id} item={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
  categories: { name: string }[];
}> = async () => {
  const res1 = await fetch(`http://localhost:3001/model/random`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res2 = await fetch(`http://localhost:3001/model/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const products = await res1.json();
  const categories = await res2.json();

  return {
    props: {
      products,
      categories,
    },
  };
};

export default Home;
