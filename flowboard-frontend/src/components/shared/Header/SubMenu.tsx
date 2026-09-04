"use client";

import { JWTDecode } from "@/utils/jwt";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SubMenu = () => {
  const { decoded } = JWTDecode();

  const role = decoded?.role;
  const pathname = usePathname();

  // Define all possible links
  const allLinks = [
    { href: "/", label: "Home" },
    { href: "/lawyers", label: "Lawyers" },
    { href: "/posts", label: "Posts" },
    { href: "/services", label: "Service Areas" },

    { href: "/premium", label: "Premium Access" },
    { href: "/about-us", label: "About Us" },
  ];

  // Filter links based on role
  const filteredLinks = allLinks.filter((link) => {
    if (!role) {
      return link.href !== "/premium" && link.href !== "/create-post";
    } else if (role === "User") {
      return link.href !== "/premium";
    } else if (role === "Lawyer") {
      return link.href !== "/create-post" && link.href !== "/lawyers";
    }
    return true;
  });

  return (
    <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-600">
      {filteredLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full transition-all duration-300 
              ${
                isActive
                  ? "bg-secondary/10 text-secondary font-bold shadow-sm"
                  : "hover:bg-gray-100 hover:text-secondary"
              }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SubMenu;
