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
        <div className="sticky z-40 flex flex-col h-screen">
            <div>Logo</div>
            <div>
                <Link href={"/admin/products"}>Products</Link>
            </div>
        </div>
    );
};

export default Sidebar;
