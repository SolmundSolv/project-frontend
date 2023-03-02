import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";
import Table from "../../../../components/Admin/Table";

type ReportTable = {
  id: string;
  name: string;
  count: number;
};

const columnHelper = createColumnHelper<ReportTable>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => (
      <Link href={"/admin/products/" + info.row.original.id}>
        {info.getValue()}
      </Link>
    ),
    header: "Date",
  }),
  columnHelper.accessor("count", {
    cell: (info) => <div>{info.getValue()}</div>,
    header: "No. Orders",
  }),
];

const ProductsRaport = ({ from, to }: { from: Date; to: Date }) => {
  const [tableData, setTableData] = React.useState<ReportTable[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/model/raport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: from,
        endDate: to,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTableData(data);
        setLoading(false);
      });
  }, [from, to]);

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Table columns={columns} tableData={tableData} />
        </div>
      )}
    </div>
  );
};

export default ProductsRaport;
