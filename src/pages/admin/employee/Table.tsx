import type { SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Order = {
  id: string;
  number: number;
  price: number;
  status: { name: string };
  createdAt: string;
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const EmployeeTable = (props: { tableData: any[]; columns: any[] }) => {
  const { tableData, columns } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState(() => [...tableData]);
  const table = useReactTable({
    columns,
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    header.index === 0 ? "text-left" : "text-right",
                    "p-4 font-bold uppercase text-gray-400"
                  )}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={" hover:bg-slate-200"}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={classNames(
                    cell.column.id === "number" ? "text-left" : "text-right",
                    "mx-4 border border-slate-200 px-4 py-2 font-semibold"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="aspect-1 rounded border border-gray-200 py-1 px-2 font-semibold text-gray-400 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          max={table.getPageCount()}
          min={1}
          className="mx-2 w-12 rounded border p-1 text-center"
        />
        <button
          className="aspect-1 rounded border border-gray-200 py-1 px-2 font-semibold text-gray-400 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* <div>{table.getRowModel().rows.length} Rows</div> */}
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
};

export default EmployeeTable;
