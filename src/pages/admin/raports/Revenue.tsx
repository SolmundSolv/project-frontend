import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Table from "../../../../components/Admin/Table";

type ReportTable = {
  date: string;
  noOfOrders: number;
  noProducts: number;
  tax: number;
  total: number;
};

const columnHelper = createColumnHelper<ReportTable>();

const columns = [
  columnHelper.accessor("date", {
    cell: (info) => <div>{info.getValue().split("T")[0]}</div>,
    header: "Date",
  }),
  columnHelper.accessor("noOfOrders", {
    cell: (info) => <div>{info.getValue()}</div>,
    header: "No. Orders",
  }),
  columnHelper.accessor("noProducts", {
    cell: (info) => <div>{info.getValue()}</div>,
    header: "Products Rent",
  }),
  columnHelper.accessor("tax", {
    cell: (info) => <div>${Number(info.getValue() * 0.23).toFixed(2)}</div>,
    header: "Tax",
  }),
  columnHelper.accessor("total", {
    cell: (info) => <div>${Number(info.getValue()).toFixed(2)}</div>,
    header: "Total",
  }),
];

const Revenue = ({ from, to }: { from: Date; to: Date }) => {
  const [tableData, setTableData] = React.useState<ReportTable[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/order/raport`, {
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
          <div>
            <div>
              <span className="font-bold">No. Orders: </span>
              {tableData.reduce((acc, curr) => acc + curr.noOfOrders, 0)}
            </div>
            <div>
              <span className="font-bold">Product Rent: </span>
              {tableData.reduce((acc, curr) => acc + curr.noProducts, 0)}
            </div>
            <div>
              <div>
                <span className="font-bold">Tax: </span>$
                {tableData
                  .reduce((acc, curr) => acc + curr.tax * 0.23, 0)
                  .toFixed(2)}
              </div>
              <span className="font-bold">Total: </span>$
              {tableData
                .reduce((acc, curr) => acc + curr.total * 1, 0)
                .toFixed(2)}
            </div>
          </div>

          <Table columns={columns} tableData={tableData} />
        </div>
      )}
    </div>
  );
};

export default Revenue;
