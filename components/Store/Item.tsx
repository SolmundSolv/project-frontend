import Image from "next/image";
import Link from "next/link";
import type { Product } from "../../src/types/responses";

export default function Item(item: { item: Product }): JSX.Element {
  if (item)
    return (
      <Link
        key={item.item.id}
        href="/products/[id]"
        as={`/products/${item.item.id}`}
      >
        <div className="group border border-gray-700 p-2 shadow-md md:p-4">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Image
              src={`http://localhost:3001/image/${item.item.img}`}
              width={300}
              height={300}
              alt={item.item.description}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700 dark:text-white">
            {item.item.name}
          </h3>
          <p className="mt-1 text-lg font-medium text-gray-900 dark:text-yellow-400">
            ${item.item.price}
          </p>
        </div>
      </Link>
    );
  return <></>;
}
