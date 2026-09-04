"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Users, FileText, Star, Info } from "lucide-react";

import SignOut from "../SignOut";
import { JWTDecode } from "@/utils/jwt";

const SmallDeviceMenu = ({ setIsOpen }: any) => {
  const pathname = usePathname();
  const { decoded } = JWTDecode();

  const role = decoded?.role;
  const email = decoded?.email;

  // All possible links
  const allLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/lawyers", label: "Lawyers", icon: Users },
    { href: "/posts", label: "Posts", icon: FileText },
    { href: "/services", label: "Service Areas", icon: Info },
    { href: "/premium", label: "Premium Access", icon: Star },
    { href: "/about-us", label: "About Us", icon: Info },
    { href: "/my-profile/manage-profile", label: "My Profile", icon: Info },
  ];

  // Filter links based on role
  const filteredLinks = allLinks.filter((link) => {
    if (!role) return link.href !== "/premium" && link.href !== "/create-post";
    if (role === "User") return link.href !== "/premium"; // User
    if (role === "Lawyer")
      return link.href !== "/create-post" && link.href !== "/lawyers"; // Lawyer
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute right-0 top-16 w-[320px] p-5 text-white rounded-2xl shadow-xl bg-black border border-gray-200 flex flex-col gap-4 z-50"
    >
      <div className="border-b pb-3">
        <h1 className="text-lg font-semibold">Menu</h1>
        <p className="text-sm text-gray-300">Legal Services Portal</p>
      </div>

      {filteredLinks.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-[5px] text-sm font-medium transition-all duration-200
              ${isActive ? "bg-white/10 text-white" : "text-white hover:bg-white/10"}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        );
      })}

      {!email ? (
        <div onClick={() => setIsOpen(false)} className="flex gap-2 mt-2">
          <Link
            href="/auth/login"
            className="border border-primary text-secondary px-4 py-1 rounded-[4px] font-medium"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="border border-primary text-white bg-primary px-4 py-1 rounded-[4px] font-medium"
          >
            Get Started
          </Link>
        </div>
      ) : (
        <SignOut />
      )}
    </motion.div>
  );
};

export default SmallDeviceMenu;
