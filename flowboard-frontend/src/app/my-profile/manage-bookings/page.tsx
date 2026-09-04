"use client";
import BookingList from "@/components/lawyers/LawyerBookings";
import UserBookings from "@/components/lawyers/UserBookings";
import Sidebar from "@/components/profile/Sidebar";
import { JWTDecode } from "@/utils/jwt";

const ManageBookingsPage = () => {
  const { decoded } = JWTDecode();
  if (!decoded?.role) {
    return "User not found";
  }

  return (
    <>
      <div className="grid bg-[#f8f8f8] grid-cols-5 p-6 gap-6">
        <div className="lg:col-span-1">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-5 bg-white p-5 lg:col-span-4 rounded-[8px] 3xl:w-4/5">
          {decoded.role === "User" ? (
            <UserBookings></UserBookings>
          ) : (
            <BookingList></BookingList>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageBookingsPage;
