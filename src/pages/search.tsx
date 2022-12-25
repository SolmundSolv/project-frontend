import { useRouter } from "next/router";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import type { ReactElement } from "react";
import React from "react";
import Item from "../../components/Store/Item";
import Layout from "../../components/Store/Layout";
import type { Product } from "@prisma/client";

const Search = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-600">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((res) => (
            <Item item={res} key={res.id} />
          ))}
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
