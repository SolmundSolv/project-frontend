import { Table } from "flowbite-react";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Link from "next/link";
import type { ReactElement } from "react";
import React, { useState } from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import AddForm from "./AddForm";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const Products = ({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  // const { data: products } = trpc.product.all.useQuery();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AddForm open={open} setOpen={setOpen} />
      <button
        className="rounded-md bg-blue-500 px-8 py-2 font-medium text-white"
        onClick={() => setOpen(true)}
      >
        Add
      </button>
      <div className="p-6">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Staus</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {products?.map((res) => {
              return (
                <Table.Row key={res?.id}>
                  <Table.Cell>
                    <Link
                      href={"products/[id]"}
                      as={`products/${res?.id}`}
                      key={res?.id}
                    >
                      {res?.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      href={"products/[id]"}
                      as={`products/${res?.id}`}
                      key={res?.id}
                    >
                      {res?.price.toString()}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      href={"products/[id]"}
                      as={`products/${res?.id}`}
                      key={res?.id}
                    >
                      {res?.description}
                    </Link>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  products: Product[];
}> = async (ctx: GetServerSidePropsContext) => {
  // const session = await getServerAuthSession(ctx);
  // if (!session) {
  //   return {
  //     redirect: { destination: "/api/auth/signin", permanent: false },
  //     props: {},
  //   };
  const res = await fetch("http://localhost:3001/model", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const products = await res.json();
  return { props: { products } };
};

Products.getLayout = function getLayout(
  page: ReactElement<InferGetServerSidePropsType<typeof getServerSideProps>>
) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Products;
