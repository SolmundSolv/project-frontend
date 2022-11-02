/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StateContext from "../../context/StateContext";

const navigation = {
    categories: [
        {
            id: "categories",
            name: "Categories",
            sections: [
                {
                    id: "budowlane",
                    name: "Budowlane",
                    items: [
                        { name: "Betoniarki", href: "/category/Budownictwo" },
                        { name: "Wibratory do betonu", href: "#" },
                        { name: "Młotki", href: "#" },
                        { name: "Wkrętarki", href: "#" },
                    ],
                },
                {
                    id: "ogrodnictwo",
                    name: "Ogrodnictwo",
                    items: [
                        { name: "Konewki", href: "/category/Ogrodnictwo" },
                        { name: "Węże ogrodowe", href: "#" },
                        { name: "Sprinklers", href: "#" },
                    ],
                },
                {
                    id: "majesterkowicze",
                    name: "Majsterkowicze",
                    items: [
                        { name: "Młotki", href: "/category/Dla majsterkowiczów" },
                        { name: "Śrubokręty", href: "#" },
                        { name: "Klucze francuskie", href: "#" },
                    ],
                },
            ],
        },
    ],
    pages: [
        { name: "Company", href: "#" },
        { name: "Store", href: "/" },
    ],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Layout({ children }: any) {
    const [open, setOpen] = useState(false);

    return (
        <StateContext>
            <div className="bg-white dark:bg-gray-800">
                {/* Mobile menu */}

                <MobileMenu navigation={navigation} open={open} setOpen={setOpen} />

                <header className="relative bg-white dark:bg-gray-800 dark:text-white">
                    <p className="flex h-10 items-center justify-center bg-yellow-400 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">Get free delivery on orders over $100</p>

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200 dark:border-gray-900">
                            <div className="flex h-16 items-center">
                                <button type="button" className="rounded-md bg-white p-2 text-gray-400 dark:bg-gray-800 dark:text-white lg:hidden" onClick={() => setOpen(true)}>
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6 " aria-hidden="true" />
                                </button>
                                <Navbar navigation={navigation} />
                            </div>
                        </div>
                    </nav>
                </header>
                <main>{children}</main>
                <Footer />
            </div>
        </StateContext>
    );
}
