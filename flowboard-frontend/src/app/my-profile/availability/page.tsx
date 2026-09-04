"use client";

import LawyerAvailabilities from "@/components/lawyers/LawyerAvailabilities";
import WeeklyAvailabilityPage from "@/components/profile/WeeklyAvailability";
import Sidebar from "@/components/profile/Sidebar";
import { useProfileQuery } from "@/redux/features/auth/authApi";
// import { Ellipsis } from "lucide-react";

const AvailabilityPage = () => {
  const { data: profile, isLoading } = useProfileQuery("");

  return (
    <>
      <div className="grid bg-[#f8f8f8] grid-cols-5 gap-6 p-6">
        <div className="lg:col-span-1">
          <Sidebar></Sidebar>
        </div>
        {/* {isLoading && (
          <div className="flex col-span-5 lg:col-span-4 items-center justify-center">
            <Ellipsis size={200} className="animate-ping text-secondary"></Ellipsis>
          </div>
        )} */}
        {!isLoading && (
          <div className="col-span-5 bg-white rounded-[8px] lg:col-span-4">
            {profile?.data?.availabilitySetup == true ? (
              <LawyerAvailabilities />
            ) : (
              <WeeklyAvailabilityPage />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AvailabilityPage;
