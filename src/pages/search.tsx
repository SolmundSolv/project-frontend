import { useRouter } from "next/router";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import type { ReactElement } from "react";
import React from "react";
import Item from "../../components/Store/Item";
import ItemList from "../../components/Store/ItemList";
import Layout from "../../components/Store/Layout";
import type { Product } from "../../src/types/responses";

const Search = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { value } = router.query;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Search for: {value}
        </h2>
        <div className="mt-4 flex gap-6">
          <ItemList items={products} />
        </div>
      </div>
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Search;

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
}> = async (ctx: GetServerSidePropsContext) => {
  const search = ctx.query.value;
  const res2 = await fetch(`http://localhost:3001/model/search/${search}`, {
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
