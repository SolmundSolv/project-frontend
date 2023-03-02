import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";
import Table from "../../../../components/Admin/Table";

type ReportTable = {
  date: string;
  noOfMaintenance: number;
  total: number;
};

const columnHelper = createColumnHelper<ReportTable>();

const columns = [
  columnHelper.accessor("date", {
    cell: (info) => <div>{info.getValue().split("T")[0]}</div>,
    header: "Date",
  }),
  columnHelper.accessor("noOfMaintenance", {
    cell: (info) => <div>{info.getValue()}</div>,
    header: "No. Maintenance",
  }),
  columnHelper.accessor("total", {
    cell: (info) => <div>${Number(info.getValue()).toFixed(2)}</div>,
    header: "Total",
  }),
];

const MaitenanceRaport = ({ from, to }: { from: Date; to: Date }) => {
  const [tableData, setTableData] = React.useState<ReportTable[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/product/maintenance/raport`, {
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

export default MaitenanceRaport;
