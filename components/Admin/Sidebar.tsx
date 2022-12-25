import Link from "next/link";
import React from "react";

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

const Sidebar = () => {
  return (
    <div className="sticky z-40 flex h-screen flex-col bg-gray-800">
      {/* Logo */}
      <div className=" ml-4 mt-6 flex w-16 lg:ml-0">
        <Link href="/" className="h-full w-full cursor-pointer">
          <div className="ml-6 flex font-mono font-bold uppercase text-white">
            <span className="sr-only">Your Company</span>
            <img
              className="ml-4 h-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            <span className="ml-4 mt-2 text-center text-xl">SiczRentall</span>
          </div>
        </Link>
      </div>
      <div className="mx-auto mt-6 grid w-5/6 grid-cols-1 space-y-4 border-t border-gray-700 pt-8 text-gray-400">
        <Link className="ml-6 flex" href={"/admin/products"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-4 h-6 w-6
            "
          >
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
            <path
              fillRule="evenodd"
              d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Products
        </Link>
        <Link className="ml-6 flex" href={"/admin/orders"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-4 h-6 w-6"
          >
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
          Orders
        </Link>
        <Link className="ml-6 flex" href={"/admin/employee"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-4 h-6 w-6"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
          Employee
        </Link>
        <Link className="ml-6 flex" href={"/admin/tasks"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-4 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>
          Tasks
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
