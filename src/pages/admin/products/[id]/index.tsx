import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../../components/Admin/AdminLayout";
import { trpc } from "../../../../utils/trpc";
import type { NextPageWithLayout } from "../../../_app";

const ExactProduct: NextPageWithLayout = () => {
  function handleDelete(id: string) {
    mutation.mutate({ id: id });
    router.back();
  }

  const router = useRouter();
  const { id } = router.query;
  const mutation = trpc.product.delete.useMutation();
  const { data: product } = trpc.product.byId.useQuery({
    id: id?.toString() ?? "0",
  });
  return (
    <div>
      {product?.name} {product?.price.toString()} {product?.description}{" "}
      {product?.img}
      <button
        className="bg-red-500 px-7 py-2 font-bold text-white"
        onClick={() => handleDelete(product?.id ?? "")}
      >
        Delete
      </button>
    </div>
  );
};

ExactProduct.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ExactProduct;
