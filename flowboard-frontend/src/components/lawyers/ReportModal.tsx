"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useCreateReportMutation } from "@/redux/features/bookings/bookingsApi";

type TFormData = {
  comment: string;
  reportType:
    | "Harassment"
    | "Excessively_Late"
    | "Unprofessional_Behavior"
    | "Low_Effort";
  media?: FileList;
};

export default function CreateReportModal({
  bookingId,
  isReported,
}: {
  bookingId: string;
  isReported: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [createReport, { isLoading }] = useCreateReportMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFormData>();

  const onSubmit = async (data: TFormData) => {
    const formData = new FormData();
    const payload = {
      comment: data.comment,
      reportType: data.reportType,
      bookingId,
    };

    formData.append("bodyData", JSON.stringify(payload));

    if (data.media && data.media.length > 0) {
      formData.append("media", data.media[0]);
    }

    const res: any = await createReport(formData);

    if (res?.data) {
      toast.success(res.data.message || "Report submitted successfully");
      setOpen(false);
      reset();
    } else {
      toast.error(res?.error?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          disabled={isReported}
          className="bg-red-600 text-white py-2 w-full rounded-[6px] disabled:bg-gray-400"
        >
          {isReported ? "Reported" : "Report"}
        </button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-md bg-white"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <DialogHeader>
          <DialogTitle>Create Report</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Report Type */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-medium">Report Type</label>
            <select
              className="input-design"
              {...register("reportType", { required: true })}
            >
              <option value="">Select report type</option>
              <option value="Harassment">Harassment</option>
              <option value="Excessively_Late">Excessively Late</option>
              <option value="Unprofessional_Behavior">
                Unprofessional Behavior
              </option>
              <option value="Low_Effort">Low Effort</option>
            </select>

            {errors.reportType && (
              <p className="text-red-500 text-sm">Report type is required.</p>
            )}
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-medium">Comment</label>
            <textarea
              rows={4}
              className="input-design resize-none"
              placeholder="Describe the issue..."
              {...register("comment", { required: true })}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">Comment is required.</p>
            )}
          </div>

          {/* Optional Media */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-500 font-medium">
              Upload Media (Optional)
            </label>
            <input
              type="file"
              className="input-design"
              {...register("media")}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 rounded-[5px] font-medium disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
