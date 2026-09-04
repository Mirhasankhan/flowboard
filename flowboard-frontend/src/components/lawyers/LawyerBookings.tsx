"use client";

import {
  useLawyerBookingsQuery,
  useMarkCompletedMutation,
} from "@/redux/features/bookings/bookingsApi";
import { Calendar, Clock, MapPin, Video, DollarSign } from "lucide-react";
import Image from "next/image";
import { SkeletonCard } from "../shared/Skeleton";
import CancelBookingModal from "./CancelBookingModal";
import NoBookings from "./NoBookings";
import { toast } from "react-toastify";

const LawyerBookings = () => {
  const { data, isLoading } = useLawyerBookingsQuery("");
  const [markCompleted, { isLoading: isCompleteLoading }] =
    useMarkCompletedMutation();
  const bookings = data?.data?.bookings; 

  const isPastOrToday = (date: string | Date) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    return bookingDate <= today;
  };

  const handleMarkCompleted = async (bookingId: string) => {
    const response = await markCompleted(bookingId);
    console.log(response);
    toast.success(
      "Booking marked as completed. Earnings added to your account",
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">
          Manage your client consultations and appointments
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard height={400} key={idx} />
          ))}
        </div>
      )}

      {/* Bookings Grid */}
      {bookings?.length > 0 ? (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
          {bookings?.map((booking: any) => (
            <div
              className="group border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              key={booking._id}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 flex-1">
                    <div className="relative">
                      <Image
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100"
                        src={booking?.userId?.profileImage}
                        alt={booking?.userId?.fullName}
                        height={80}
                        width={80}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {booking?.userId?.fullName}
                      </h2>
                      <p className="text-sm text-gray-500 truncate">
                        {booking?.serviceId?.serviceName}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      booking.status === "Active"
                        ? "bg-blue-100 text-blue-700"
                        : booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Date & Time */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[8px]">
                    <div className="flex items-center justify-center h-10 w-10 rounded-[8px] bg-blue-100">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Date</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(booking.date).toLocaleDateString("en-GB", {
                          timeZone: "UTC",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[8px]">
                    <div className="flex items-center justify-center h-10 w-10 rounded-[8px] bg-purple-100">
                      <Clock size={18} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Time</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {booking.time}
                      </p>
                    </div>
                  </div>

                  {booking.serviceType === "Online" ? (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[8px]">
                      <div className="flex items-center justify-center h-10 w-10 rounded-[8px] bg-green-100">
                        <Video size={18} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">
                          Type
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          Online Consultation
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[8px]">
                      <div className="flex items-center justify-center h-10 w-10 rounded-[8px] bg-orange-100">
                        <MapPin size={18} className="text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.userId?.location || "My Chamber"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fee Section */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-[8px]">
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Consultation Fee
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${booking.fee}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  {/* Active + In_Person */}
                  {booking.status === "Active" &&
                    booking.serviceType === "In_Person" && (
                      <>
                        <CancelBookingModal id={booking._id} />
                        <button
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-[8px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                          onClick={() => handleMarkCompleted(booking._id)}
                        >
                          Mark as Completed
                        </button>
                      </>
                    )}

                  {/* Active + Online */}
                  {booking.status === "Active" &&
                    booking.serviceType === "Online" && (
                      <>
                        <CancelBookingModal id={booking._id} />

                        <button
                          onClick={() =>
                            window.open(booking.startUrl, "_blank")
                          }
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-[8px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                          disabled={!isPastOrToday(booking.date)}
                        >
                          <Video size={18} />
                          Start Session
                        </button>

                        <button
                          disabled={isCompleteLoading}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-[8px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          onClick={() => handleMarkCompleted(booking._id)}
                        >
                          {isCompleteLoading
                            ? "Completing..."
                            : "Mark as Completed"}
                        </button>
                      </>
                    )}

                  {/* Completed */}
                  {booking.status === "Completed" && (
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-[8px] font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
                      Report Issue
                    </button>
                  )}

                  {/* Cancelled */}
                  {booking.status === "Cancelled" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-[8px]">
                      <p className="text-sm font-semibold text-red-700 mb-1">
                        Cancellation Reason:
                      </p>
                      <p className="text-sm text-red-600">
                        {booking?.cancelReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoBookings></NoBookings>
      )}
    </div>
  );
};

export default LawyerBookings;
