import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Flowbite, DarkThemeToggle } from "flowbite-react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import Cart from "./Cart";
import { useStateContext } from "../../context/StateContext";
import LoginBtn from "../LoginBtn";

type nav = {
  categories: {
    id: string;
    name: string;
    sections: {
      id: string;
      name: string;
      items: {
        name: string;
        href: string;
      }[];
    }[];
  }[];
  pages: {
    name: string;
    href: string;
  }[];
};
const Navbar = ({ navigation }: { navigation: nav }) => {
  const [open, setOpen] = useState(false);
  const ctx = useStateContext();
  const [pages, setPages] = useState<{ name: string; href: string }[]>([]);
  React.useEffect(() => {
    const getPages = async () => {
      const res = await fetch("http://localhost:3001/navigation/type/Store");
      const data = await res.json();
      setPages(data);
    };
    getPages();
  }, []);
  return (
    <>
      {/* Flyout menus */}
      <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
        <div className="flex h-full items-center space-x-8">
          {navigation.categories.map((category) => (
            <Popover key={category.name} className="flex">
              {({ open }) => (
                <>
                  {/* Logo */}
                  <div className="ml-4 flex w-16 items-center lg:ml-0">
                    <Link href="/" className="h-full w-full cursor-pointer">
                      <div>
                        <span className="sr-only">Your Company</span>
                        <img
                          className="h-8"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt=""
                        />
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </Popover>
          ))}

          {pages.map((page) => (
            <Link key={page.name} href={page.href} className={"items-center"}>
              <p className="flex cursor-pointer items-center text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-white dark:hover:text-yellow-400">
                {page.name}
              </p>
            </Link>
          ))}
          {ctx?.user?.user?.isEmployee && (
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-white dark:hover:text-yellow-400"
            >
              Dashboard
            </Link>
          )}
        </div>
      </Popover.Group>
      <div className="mx-auto w-full px-16">
        <form action="/search" method="get">
          <input
            className="w-full rounded-full bg-gray-200 focus:border-none focus:outline-yellow-400 dark:bg-gray-700"
            type="text"
            name="value"
            id="value"
            placeholder="Search"
          />
        </form>
      </div>

      <div className="ml-auto flex items-center justify-start">
        <div className="hidden text-gray-700 hover:text-gray-800 dark:text-white lg:flex lg:flex-1  lg:items-center lg:justify-end lg:space-x-6">
          <LoginBtn />
        </div>

        {/* Cart */}
        <div className="mx-4 flow-root lg:ml-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group -m-2 flex items-center p-2"
          >
            <ShoppingBagIcon
              className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-yellow-400 dark:text-white">
              {ctx?.cartItems.length}
            </span>
            <span className="sr-only">items in cart, view bag</span>
          </button>
        </div>
        <Cart open={open} setOpen={setOpen} />
        <div>
          {/* <button id="themeToggleBtn" className="ml-4 flow-root" onClick={darkMode}>
                                        <svg id="theme-toggle-dark-icon" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                        </svg>
                                        <svg id="theme-toggle-light-icon" className="hidden h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="sr-only">Dark Mode</span>
                                    </button> */}
          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
        </div>
      </div>
    </>
  );
};

export default Navbar;
