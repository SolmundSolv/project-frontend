import type { ReactElement } from "react";
import Layout from "../../../components/Store/Layout";
import type { Product } from "../../types/responses";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ItemList from "../../../components/Store/ItemList";
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
      <div className="mx-auto grid max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:grid-cols-4 lg:px-8 lg:py-8">
        <div className="h-fit rounded-lg border border-gray-500 p-6 text-lg font-bold dark:bg-gray-800 dark:text-white">
          <h3>Categories</h3>
          <div className="grid grid-flow-row gap-2 p-2">
            {categories.map((category) => (
              <Link
                href={"/category/" + category.name}
                key={category.name}
                className="border-b border-gray-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:col-span-3">
          <ItemList items={products} />
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
  const res1 = await fetch(`http://localhost:3001/model`, {
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
