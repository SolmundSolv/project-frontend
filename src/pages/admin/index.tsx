import axios from "axios";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import React, { useRef, useState } from "react";
import AdminLayout from "../../../components/Admin/AdminLayout";
import { trpc } from "../../utils/trpc";
import type { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const adding = trpc.product.create.useMutation();
  const { data: category } = trpc.product.category.useQuery();
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const descripionRef = useRef<HTMLInputElement>(null);
  const catRef = useRef<HTMLSelectElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    setSelectedFile(event.target.files[0]);
  }
  function onSubmit(e: FormEvent) {
    e.preventDefault();

    adding.mutate({
      name: nameRef.current?.value ?? "",
      price: parseFloat(priceRef.current?.value ?? "0") ?? 0,
      img: imgRef.current?.value ?? "",
      description: descripionRef.current?.value ?? "",
      categoryId: catRef.current?.value,
    });
    const url = "http://localhost:3000/api/uploadFile";
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("fileName", selectedFile.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      console.log(selectedFile);

      console.log(formData.getAll);
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
    }
  }

  return (
    <div className="m-6 grid grid-cols-2 grid-rows-2 gap-12 bg-gray-100">
      <div className="h-full rounded-md bg-gray-500">
        <table className="h-auto w-full table-fixed rounded-md text-white">
          <thead className="rounded-t-md border-b border-gray-200 bg-gray-800 text-left font-bold">
            <tr className="rounded-md">
              <th className="p-3">Number</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="m-4 text-start">
            <tr className="m-4 border-b border-gray-400">
              <td className="p-2">957644</td>
              <td>600</td>
              <td>Ended</td>
            </tr>
            <tr className="m-4 border-b border-gray-400">
              <td className="p-2">957645</td>
              <td>1600</td>
              <td>In progress</td>
            </tr>
            <tr className="m-4">
              <td className="p-2">957646</td>
              <td>1430</td>
              <td>Waiting</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row-span-2 h-full bg-gray-700">
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <input type="text" name="name" id="name" ref={nameRef} />
          <input type="number" name="price" id="price" ref={priceRef} />
          <input
            type="text"
            name="img"
            id="img"
            value={selectedFile?.name}
            ref={imgRef}
          />
          <input
            type="text"
            name="descripion"
            id="description"
            ref={descripionRef}
          />
          <select name="" id="" ref={catRef}>
            {category?.map((res: { id: string; name: string }) => {
              return (
                <option value={res.id} key={res.id}>
                  {res.name}
                </option>
              );
            })}
          </select>
          <input type="file" name="file" id="file" onChange={handleChange} />
          <button type="submit" className="ml-5 bg-violet-400 px-4 py-2">
            Save
          </button>
        </form>
      </div>
      <div className="h-full bg-gray-800">123</div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default Dashboard;
