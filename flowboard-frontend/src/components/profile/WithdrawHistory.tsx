"use client";

import { useWithdrawHistoryQuery } from "@/redux/features/earnings/earnings.api";
import { Clock, CheckCircle, Hourglass } from "lucide-react";

const WithdrawHistory = () => {
  const { data, isLoading } = useWithdrawHistoryQuery("");

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const withdraws = data?.data || [];

  if (!withdraws.length)
    return (
      <p className="text-center text-gray-500 py-10">
        No withdraw history found.
      </p>
    );

  return (
    <div>
      <h1 className="md:text-2xl pb-6 font-medium">Withdraw History</h1>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
        {withdraws.map((item: any) => {
          const isPending = item.status === "Pending";

          return (
            <div
              key={item._id}
              className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-all 
              min-h-[170px] flex flex-col justify-between"
            >
              {/* Amount & Status */}
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">${item.amount}</div>

                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1
                ${
                  isPending
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
                >
                  {isPending ? (
                    <>
                      <Hourglass size={16} /> Pending
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} /> Accepted
                    </>
                  )}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 my-3"></div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock size={16} />
                {isPending ? (
                  <span>
                    Requested At:{" "}
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </span>
                ) : (
                  <span>
                    Accepted At:{" "}
                    <span className="font-medium">
                      {new Date(item.updatedAt).toLocaleString()}
                    </span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WithdrawHistory;
