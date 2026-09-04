"use client";

import MonthlyEarnings from "@/components/profile/MonthlyEarnings";
import Sidebar from "@/components/profile/Sidebar";
import WeeklyEarnings from "@/components/profile/WeeklyEarnings";
import WithdrawHistory from "@/components/profile/WithdrawHistory";
import WithdrawModal from "@/components/profile/WithdrawModal";
import { useEarningsSummaryQuery } from "@/redux/features/earnings/earnings.api";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

const EarningsPage = () => {
  const [type, setType] = useState("monthly");
  const { data: earningsData, isLoading } = useEarningsSummaryQuery(type);

  // if (isLoading) {
  //   return "loading...";
  // }

  const allTimeEarnings = earningsData?.data?.allTimeEarnings;
  const currentEarningsValue = earningsData?.data?.currentEarnings;

  return (
    <div className="bg-[#f8f8f8]">
      <>
        <div className="grid grid-cols-5 p-6 gap-6">
          <div className="lg:col-span-1">
            <Sidebar></Sidebar>
          </div>
          <div className="lg:col-span-4 col-span-5 rounded-xl bg-white p-5">
            <div className="md:flex gap-8 mb-8">
              <div className="border bg-[#f8f8f8] text-center w-full py-6 rounded-[8px]">
                <h1 className="text-xl font-medium text-gray-500">
                  Current Earnings
                </h1>
                {isLoading ? (
                  <Ellipsis
                    size={50}
                    className="mx-auto text-secondary animate-ping"
                  ></Ellipsis>
                ) : (
                  <h1 className="text-3xl font-medium text-secondary">
                    ${currentEarningsValue}
                  </h1>
                )}
              </div>
              <div className="border mt-2 md:mt-0 bg-[#f8f8f8] text-center w-full py-6 rounded-[8px]">
                <h1 className="text-xl font-medium text-gray-500">
                  All Time Earnings
                </h1>
                {isLoading ? (
                  <Ellipsis
                    size={50}
                    className="mx-auto text-secondary animate-ping"
                  ></Ellipsis>
                ) : (
                  <h1 className="text-3xl font-medium text-secondary">
                    ${allTimeEarnings}
                  </h1>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 xl:col-span-3">
                <div className="flex justify-between items-center pb-4">
                  <h1 className="md:text-2xl font-medium ">
                    Earnings Overview
                  </h1>
                  <select
                    className="border bg-primary text-secondary bg-opacity-15 outline-none font-bold rounded-[6px] px-2 md:px-5 py-1 md:py-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                {type == "monthly" && (
                  <MonthlyEarnings
                    chartData={earningsData?.data?.chartData}
                    currentEarnings={currentEarningsValue}
                  ></MonthlyEarnings>
                )}
                {type == "weekly" && (
                  <WeeklyEarnings
                    weeklyData={earningsData?.data?.chartData}
                    currentEarnings={currentEarningsValue}
                  />
                )}
              </div>
              <div className="col-span-4 xl:col-span-1">
                <WithdrawHistory></WithdrawHistory>
                <WithdrawModal
                  currentEarnings={currentEarningsValue}
                ></WithdrawModal>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default EarningsPage;
