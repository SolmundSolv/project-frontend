import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ChangeEvent, ReactElement } from "react";
import { useRef, useState } from "react";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import AddAttribute from "./AddAttribute";
import { useRouter } from "next/router";
import withAuth from "../WithAuth";
import AddProduct from "./AddProduct";

type SingleProduct = {
  serialNumer: string;
  boughtAt: Date;
  warranty: string;
};

type Attribute = {
  name: string;
  value: string;
};
interface FileWithPreview extends File {
  preview: string;
}
const columnHelper = createColumnHelper<SingleProduct>();

//react table column def
const columns = [
  columnHelper.accessor("serialNumer", {
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    header: () => <span>Serial Number</span>,
  }),
  columnHelper.accessor("boughtAt", {
    cell: (info) => info.getValue().toDateString().split("T")[0],
    header: () => <span>Bought At</span>,
  }),
  columnHelper.accessor("warranty", {
    cell: (info) => <div>{info.getValue == null && "No warranty"}</div>,
    header: () => <span>Warranty</span>,
  }),
];

const NewProduct = ({
  all,
  status,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  const [openAttribute, setOpenAttribute] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState<FileWithPreview | null>(null);
  const [model, setModel] = useState<SingleProduct[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const router = useRouter();

  function handleImgChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0] as FileWithPreview;
    const reader = new FileReader();
    reader.onloadend = () => {
      file.preview = reader.result as string;
      setImageSrc(file);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  }
  async function handleSaveing() {
    if (!nameRef.current?.value) return alert("Name is required");
    if (!descriptionRef.current?.value) return alert("Description is required");
    if (!priceRef.current?.value) return alert("Price is required");
    if (!selectedFile) return alert("Image is required");
    const res = await fetch("http://localhost:3001/model/", {
      method: "POST",
      body: JSON.stringify({
        name: nameRef.current?.value,
        description: descriptionRef.current?.value,
        img: selectedFile?.name,
        price: parseInt(priceRef.current?.value ?? "0"),
        category: categoryRef.current?.value,
        attributes: attributes,
        products: model,
        isActive: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const formData = new FormData();
    formData.append("media", selectedFile);

    fetch("http://localhost:3001/image/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert(res.statusText);
    }
  }
  if (!all) all = [];
  return (
    <div className="grid grid-cols-[300px,_1fr] gap-6 p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">Thumbnail</span>
          <Image
            src={imageSrc?.preview || "/img/placeholder.png"}
            alt="product"
            width={300}
            height={300}
            className="mx-auto mt-6 w-auto rounded-lg object-cover object-center shadow-md"
          />
          <span className="mx-auto mt-6 text-center text-sm text-gray-400">
            Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image
            files are accepted
          </span>
          <input
            type="file"
            name="img"
            id="img"
            className="hidden"
            onChange={handleImgChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          <label
            className="mt-6 flex cursor-pointer justify-center rounded-lg bg-blue-500 py-2 font-bold text-white"
            htmlFor="img"
          >
            Edit
          </label>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Status</span>
            <div className="aspect-1 h-4 place-self-center rounded-full bg-green-400"></div>
          </div>
          <select className="mt-6 rounded-lg">
            {status?.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <span className="mx-auto mt-6 text-center text-sm text-gray-400">
            Set the product status. If the product is inactive, it will not be
            displayed on the website
          </span>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <span className="text-xl font-bold">Category</span>
          <select
            className="mt-6 w-full rounded-lg border p-2"
            ref={categoryRef}
          >
            {category?.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <span className="mt-2 text-sm text-gray-400">
            A product category is required. It will be displayed on the product
            page
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">General</span>
            <button
              className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
              onClick={() => handleSaveing()}
            >
              Save
            </button>
          </div>
          <span className="mt-6 font-semibold">Product Name</span>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border p-2"
            ref={nameRef}
          />
          <span className="mt-2 text-sm text-gray-400">
            A product name is required and must be unique. It will be displayed
            on the product page
          </span>
          <span className="mt-6 font-semibold">Description</span>
          <textarea
            className="mt-2 w-full rounded-lg border p-2"
            ref={descriptionRef}
          />
          <span className="mt-2 text-sm text-gray-400">
            A product description is required. It will be displayed on the
            product page
          </span>
          <span className="mt-6 font-semibold">Price</span>
          <input
            type="text"
            className="mt-2 w-full rounded-lg border p-2"
            ref={priceRef}
          />
          <span className="mt-2 text-sm text-gray-400">
            A product price is required. It will be displayed on the product
            page
          </span>
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Details</span>

            <button
              className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
              onClick={() => setOpenAttribute(true)}
            >
              Add
            </button>
            <AddAttribute
              open={openAttribute}
              setOpen={setOpenAttribute}
              attributes={attributes}
              setAttributes={setAttributes}
            />
          </div>
          {attributes?.length != 0 ? (
            attributes?.map((a) => (
              <div className="mt-6" key={a.name}>
                <span className="font-semibold">{a.name}</span>
                <input
                  type="text"
                  className="mt-2 w-full rounded-lg border p-2"
                  value={a.value}
                  readOnly
                />
              </div>
            ))
          ) : (
            <div className="mt-6 flex justify-center">
              <span className="font-semibold">
                No attributes have been added yet
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col rounded-lg border bg-white p-6 shadow-md">
          <div className="flex justify-between">
            <span className="text-xl font-bold">Equipment</span>
            <button
              className="rounded-lg bg-blue-500 py-2 px-4 font-bold text-white"
              onClick={() => setOpenProduct(true)}
            >
              Add
            </button>{" "}
            <AddProduct
              open={openProduct}
              setOpen={setOpenProduct}
              status={status}
              model={model}
              setModel={setModel}
            />
          </div>
          <div className="mt-6">
            <Table tableData={model} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthNewProduct = withAuth(NewProduct);

AuthNewProduct.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  all: SingleProduct[];
  status: { id: string; name: string }[];
  category: { id: string; name: string }[];
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;

  const res2 = await fetch(`http://localhost:3001/product/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const all = await res2.json();
  const res3 = await fetch(`http://localhost:3001/product/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const status = await res3.json();
  const res4 = await fetch(`http://localhost:3001/model/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const category = await res4.json();
  return { props: { all, status, category } };
};

export default AuthNewProduct;
