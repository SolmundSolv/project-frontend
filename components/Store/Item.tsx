import type { inferProcedureOutput } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import type { AppRouter } from "../../src/server/trpc/router/_app";

export default function Item({ item }: { item: inferProcedureOutput<AppRouter["product"]["byId"]> }): JSX.Element {
    if (item)
        return (
            <Link key={item.id} href="/products/[id]" as={`/products/${item.id}`}>
                <div className="group border border-gray-700 p-2 shadow-md md:p-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <Image src={`/img/${item.img}`} width={300} height={300} alt={item.description} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 dark:text-white">{item.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900 dark:text-yellow-400">${item.price.toString()}</p>
                </div>
            </Link>
        );
    return <></>;
}
