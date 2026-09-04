"use client";

import LawyerProfile from "@/components/profile/LawyerProfile";
import Sidebar from "@/components/profile/Sidebar";
import UserProfile from "@/components/profile/UserProfile";
import { JWTDecode } from "@/utils/jwt";

const ManageProfile = () => {
  const { decoded } = JWTDecode();
  return (
 <div className="grid bg-[#f8f8f8] grid-cols-5 p-6 gap-6">
      <div className="lg:col-span-1">
        <Sidebar></Sidebar>
      </div>
      <div className="col-span-5 bg-white rounded-[8px] lg:col-span-4">
        {decoded?.role == "User" ? (
          <UserProfile></UserProfile>
        ) : (
          <LawyerProfile></LawyerProfile>
        )}
      </div>
    </div>
  );
};

export default ManageProfile;
