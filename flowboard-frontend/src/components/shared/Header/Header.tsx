"use client";
import Container from "@/utils/Container";
import Link from "next/link";
import SubMenu from "./SubMenu";
import Image from "next/image";
import { useState } from "react";
import DropDownMenus from "./DropDownMenus";
import SmallDeviceMenu from "./SmallDeviceMenu";
import { Menu, X } from "lucide-react";
import { FaFacebookMessenger } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import logo from "../../../assets/logo.main.png";
import { useProfileQuery } from "@/redux/features/auth/authApi";

const Header = () => {
  const { data: profileData } = useProfileQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { email, role, name } = useAppSelector(useCurrentUser);

  return (
    <div className="bg-white border-b">
      <Container>
        <div className="flex justify-between items-center py-6">
          <Link
            style={{
              fontFamily: "'Satisfy', cursive",
            }}
            href="/"
            className="flex text-green-600 text-3xl font-bold items-center gap-1"
          >
            <Image height={70} width={70} src={logo} alt="logo"></Image>
          </Link>
          <div className="hidden lg:block">
            <SubMenu></SubMenu>
          </div>
          <div className="hidden relative lg:flex items-center gap-2">
            {!email ? (
              <>
                <Link
                  className="border border-primary text-secondary px-4 py-1 rounded-[4px] font-medium"
                  href="/auth/login"
                >
                  Login
                </Link>
                <Link
                  className="border border-primary text-white bg-primary px-4 py-1 rounded-[4px] font-medium"
                  href="/auth/register"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link className="bg-gray-200 p-2 rounded-full" href="/messages">
                  <FaFacebookMessenger size={30}></FaFacebookMessenger>
                </Link>
                <div
                  onClick={() => setActive(!active)}
                  className="p-1 rounded-[8px] shadow cursor-pointer flex items-center gap-1"
                >
                  <Image
                    className="h-8 rounded-full w-8 object-cover"
                    height={20}
                    width={20}
                    alt=""
                    src={
                      profileData?.data.profileImage ||
                      "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
                    }
                  ></Image>
                  <div>
                    <h1 className="font-semibold">{name}</h1>
                    <h1 className="text-xs">{role}</h1>
                  </div>
                </div>
              </>
            )}

            {active && (
              <div className="absolute right-0 top-16 z-50">
                <DropDownMenus setActive={setActive}></DropDownMenus>
              </div>
            )}
          </div>
          <div className="lg:hidden relative">
            {!isOpen && (
              <Menu
                className="cursor-pointer"
                onClick={() => setIsOpen(true)}
              ></Menu>
            )}
            {isOpen && (
              <X
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              ></X>
            )}
            {isOpen && (
              <AnimatePresence>
                {isOpen && <SmallDeviceMenu setIsOpen={setIsOpen} />}
              </AnimatePresence>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
