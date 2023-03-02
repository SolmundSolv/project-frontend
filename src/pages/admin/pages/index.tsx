import { createColumnHelper } from "@tanstack/react-table";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ChangeEvent, ReactElement } from "react";
import React from "react";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import Table from "../../../../components/Admin/Table";
import withAuth from "../WithAuth";
import AddPages from "./AddPages";
import Image from "next/image";
import type { PageSection } from "../../../types/responses";
import AddSection from "./AddSection";
import EditSection from "./EditSection";

type PageType = {
  name: string;
  href: string;
  title: string;
};

const PageWithPages = ({
  admin,
  store,
  types,
  sections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const columnHelper = createColumnHelper<PageType>();
  const columnHelperSection = createColumnHelper<PageSection>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor("href", {
      cell: (info) => info.getValue(),
      header: () => <span>URL</span>,
    }),
    columnHelper.accessor("title", {
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
    }),
  ];

  const columnsSection = [
    columnHelperSection.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Title</span>,
    }),
    columnHelperSection.accessor("Page.name", {
      cell: (info) => info.getValue(),
      header: () => <span>Page</span>,
    }),
    columnHelperSection.accessor("id", {
      cell: (info) => (
        <div className="flex justify-end gap-2">
          <button
            className="rounded-lg bg-blue-500 px-2 py-1 text-white"
            onClick={() => {
              setOpen2(true);
              setSelectedSection(info.getValue());
            }}
          >
            Edit
          </button>
          <button
            className="rounded-lg bg-red-500 px-2 py-1 text-white"
            onClick={() => {
              fetch(`http://localhost:3001/pages/section/${info.getValue()}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((res) => {
                if (res.ok) window.location.reload();
              });
            }}
          >
            Delete
          </button>
        </div>
      ),
      header: () => <span>Actions</span>,
    }),
  ];
  interface FileWithPreview extends File {
    preview: string;
  }
  const typeRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [openSection, setOpenSection] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [imageSrc, setImageSrc] = React.useState<FileWithPreview | null>(null);
  const [selectedSection, setSelectedSection] = React.useState<string>(
    "cleh8z9cr0001tkncm77iij0v"
  );

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
  function handleSaveImg() {
    if (!selectedFile) return;
    if (selectedFile.name !== "banner.jpg")
      alert("Please name the image banner.jpg");
    const formData = new FormData();
    formData.append("media", selectedFile);
    fetch("http://localhost:3001/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="m-6 bg-white p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pages</h1>
        <button
          className="flex rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add
        </button>
        <AddPages open={open} setOpen={setOpen} types={types} />
      </div>
      <div className="mb-6 grid grid-cols-2 gap-6">
        <div className="">
          <span className="text-xl font-bold">Admin</span>
          <Table columns={columns} tableData={admin} />
        </div>
        <div>
          <span className="text-xl font-bold">Store</span>
          <Table columns={columns} tableData={store} />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <span className="text-xl font-bold">Types</span>
          <div className="flex gap-2">
            <input
              type="text"
              ref={typeRef}
              className="rounded-lg border-2 border-gray-300 px-3 py-2"
            />

            <button
              className="flex rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600"
              type="button"
              onClick={() => {
                if (!typeRef.current?.value) alert("Please enter a type");
                fetch("http://localhost:3001/navigation/type", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: typeRef.current?.value,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => console.log(data));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </button>
          </div>
        </div>
        <ul>
          {types &&
            types.map((type, index) => <li key={index}>{type.name}</li>)}
        </ul>
      </div>
      <div className=" mt-6">
        <div className="mb-6 flex justify-between">
          <h3 className="text-2xl font-bold">Banner</h3>
          <div className="flex gap-2">
            <button
              onClick={handleSaveImg}
              className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:bg-blue-600"
            >
              Save
            </button>

            <label
              htmlFor="file"
              className="cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:bg-blue-600"
            >
              Edit
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleImgChange}
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Image
            src={imageSrc?.preview || "http://localhost:3001/image/banner.jpg"}
            width={1000}
            height={500}
            alt="Banner"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between">
          <EditSection open={open2} setOpen={setOpen2} id={selectedSection} />
          <h3 className="text-2xl font-bold">Page Sections</h3>
          <button
            className="flex rounded-lg bg-blue-500 px-3 py-2 font-semibold text-white hover:bg-blue-600 focus:bg-blue-600"
            type="button"
            onClick={() => setOpenSection(!openSection)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add
          </button>
          <AddSection open={openSection} setOpen={setOpenSection} />
        </div>
        <Table columns={columnsSection} tableData={sections} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  admin: PageType[];
  store: PageType[];
  types: { name: string }[];
  sections: PageSection[];
}> = async () => {
  const res1 = await fetch("http://localhost:3001/page/type/Admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res2 = await fetch("http://localhost:3001/page/type/Store", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res3 = await fetch("http://localhost:3001/page/type", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res4 = await fetch("http://localhost:3001/page/section", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const admin = await res1.json();
  const store = await res2.json();
  const types = await res3.json();
  const sections = await res4.json();
  return {
    props: {
      admin,
      store,
      types,
      sections,
    },
  };
};

const AuthPages = withAuth(PageWithPages);

AuthPages.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AuthPages;
