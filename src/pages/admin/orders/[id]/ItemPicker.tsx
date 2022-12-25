import { Dialog, Transition } from "@headlessui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Dispatch, SetStateAction, HTMLProps } from "react";
import React, { Fragment } from "react";
import type { Product } from ".";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => (
      <div>
        <IndeterminateCheckbox
          {...{
            checked: info.row.getIsSelected(),
            indeterminate: info.row.getIsSomeSelected(),
            onChange: info.row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  }),
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor("category", {
    cell: (info) => info.getValue()?.name,
    header: () => <span>Category</span>,
  }),
];

const ItemPicker = ({
  open,
  setOpen,
  orderId,
  props,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orderId: string;
  props: Product[];
}) => {
  const [data, setData] = React.useState<Product[]>(() => [...props]);
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    columns,
    data,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative z-40 mx-auto my-8 w-full max-w-2xl rounded-lg bg-white shadow-xl">
              <div className="p-6">
                <table>
                  <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th key={header.id}>
                            {header.isPlaceholder ? null : (
                              <div>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className={" hover:bg-slate-300"}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <button
                  className="mb-2 rounded border p-2"
                  onClick={() => {
                    const products = table
                      .getSelectedRowModel()
                      .flatRows.map((row) => {
                        return {
                          id: row.original.id,
                        };
                      });
                    const productPrices = table
                      .getSelectedRowModel()
                      .flatRows.map((row) => {
                        return parseInt(row.original.price);
                      });
                    //sum up the price of the selected products
                    const price = productPrices.reduce((a, b) => a + b, 0);
                    handleSubmit(orderId, products, price);
                  }}
                >
                  Add Products
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

function handleSubmit(
  orderId: string,
  selectedProducts: { id: string }[],
  price: number
) {
  console.info("handleSubmit", JSON.stringify({ selectedProducts, price }));
  fetch(`http://localhost:3001/order/${orderId}/add-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //send products and price to backend
    body: JSON.stringify({ selectedProducts, price }),
  });
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export default ItemPicker;

//The ItemPicker component is a modal that will be used to select items to add to an order. It is a simple table that will be populated with data from the API. The table will be created using the react-table library.
