"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCancelBookingMutation } from "@/redux/features/bookings/bookingsApi";

const CancelBookingModal = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();

  const handleCancelBooking = async () => {
    const data = {
      bookingId: id,
      cancelReason: reason,
    };

    const response: any = await cancelBooking(data);
    console.log(response);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-red-50 py-2 text-red-600 w-full rounded-[6px]">
          Cancel Session
        </button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-lg bg-white"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-gray-600 pb-4 text-sm">
            Please provide a reason for cancelling this booking with Sarah
            Mitchell.
          </p>

          <textarea
            onChange={(e) => setReason(e.target.value)}
            placeholder="enter cancellation reason"
            className="input-design"
            rows={3}
            name=""
            id=""
          ></textarea>
          <div className="flex gap-2">
            <button
              className="bg-red-600 disabled:bg-gray-500 text-white mt-2 px-2 py-1 rounded-[5px]"
              disabled={!reason || isLoading}
              onClick={() => handleCancelBooking()}
            >
              {isLoading ? "Submitting" : "Submit Cancellation"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingModal;
