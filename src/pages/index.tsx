import Item from "../../components/Store/Item";
import type { ReactElement } from "react";
import Layout from "../../components/Store/Layout";
import type { Product } from "../types/responses";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ItemList from "../../components/Store/ItemList";

const Home = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto flex max-w-2xl gap-6 py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <ItemList items={products} />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
}> = async () => {
  const res2 = await fetch(`http://localhost:3001/model`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await res2.json();

  return {
    props: {
      products,
    },
  };
};

export default Home;
