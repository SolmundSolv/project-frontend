import Link from "next/link";
import React from "react";

type NavLink = {
  id: string;
  name: string;
  href: string;
  iconPath: string;
};

const Sidebar = () => {
  const [sidebar, setSidebar] = React.useState<NavLink[]>([]);
  React.useEffect(() => {
    const res1 = fetch("http://localhost:3001/navigation/type/Admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res1) => {
      res1.json().then((data) => {
        setSidebar(data);
      });
    });
  }, []);
  return (
    <div className="sticky z-40 flex h-screen flex-col bg-gray-800">
      {/* Logo */}
      <div className=" ml-4 mt-6 flex w-16 lg:ml-0">
        <Link href="/admin" className="h-full w-full cursor-pointer">
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
      <div className="mx-auto mt-6 grid w-5/6 grid-cols-1 space-y-4 border-t border-gray-700 pt-8 font-semibold text-gray-400">
        {sidebar.map((item) => (
          <Link className="ml-6 flex" href={item.href} key={item.name}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-4 h-6 w-6"
            >
              <g dangerouslySetInnerHTML={{ __html: item.iconPath }} />
            </svg>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
