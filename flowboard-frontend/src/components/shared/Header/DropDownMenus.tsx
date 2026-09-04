"use client";

import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import {
  Calendar,
  CircleDollarSign,
  User,
  CalendarCheck,
  LogOut,
  ChevronRight,
  Shield,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { JWTDecode } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface DropDownMenusProps {
  setActive: (active: boolean) => void;
}

const DropDownMenus = ({ setActive }: DropDownMenusProps) => {
  const { name, email, role } = useAppSelector(useCurrentUser);
  const { data: profileData } = useProfileQuery("");
  const { decoded } = JWTDecode();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(
      setUser({
        name: "",
        email: "",
        role: "",
        token: "",
      })
    );
    Cookies.remove("token");
    setActive(false);
    router.push("/");
  };

  const userRole = decoded?.role || role || "Client";
  const avatarUrl =
    profileData?.data?.profileImage ||
    "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[300px] bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden animate-in fade-in zoom-in-95 duration-150 z-50 text-slate-800"
    >
      {/* User Header Profile Card */}
      <div className="p-4 bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Image
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-xs"
              height={44}
              width={44}
              alt={name || "User"}
              src={avatarUrl}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h3 className="font-bold text-sm text-slate-900 truncate">
                {name || "User"}
              </h3>
              {userRole === "Lawyer" && (
                <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-teal-100/80 text-teal-800 text-[10px] font-semibold">
                  <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                  Lawyer
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 truncate" title={email as string}>
              {email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu Options */}
      <div className="p-2 space-y-0.5">
        <Link
          href="/my-profile/manage-profile"
          onClick={() => setActive(false)}
          className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-primary transition-all duration-150"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-medium block leading-tight">My Account</span>
              <span className="text-[11px] text-slate-400 group-hover:text-slate-500">Profile & security</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href="/my-profile/manage-bookings"
          onClick={() => setActive(false)}
          className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-primary transition-all duration-150"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-medium block leading-tight">Booking History</span>
              <span className="text-[11px] text-slate-400 group-hover:text-slate-500">Appointments & logs</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>

        {userRole === "Lawyer" && (
          <>
            <Link
              href="/my-profile/manage-earnings"
              onClick={() => setActive(false)}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-primary transition-all duration-150"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <CircleDollarSign className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium block leading-tight">Earnings</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-500">Payouts & balances</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/my-profile/availability"
              onClick={() => setActive(false)}
              className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-primary transition-all duration-150"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-medium block leading-tight">Availability</span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-500">Schedule & time slots</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </>
        )}
      </div>

      {/* Sign Out Section */}
      <div className="p-2 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={handleSignOut}
          className="group w-full flex items-center justify-between px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors duration-150"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-100/60 text-rose-600 group-hover:bg-rose-200/60 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold">Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DropDownMenus;
