"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useCreateReviewMutation } from "@/redux/features/bookings/bookingsApi";

type ReviewForm = {
  rating: number;
  comment: string;
};

interface GiveReviewModalProps {
  bookingId: string;
  isReview: boolean;
}

const GiveReviewModal = ({ bookingId, isReview }: GiveReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewForm>();

  const onSubmit = async (datad: ReviewForm) => {
    if (rating === 0) return;
    const data = {
      bookingId,
      comment: datad.comment,
      rating,
    };
    const response = await createReview(data);
    console.log(response);
    reset();
    setRating(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          disabled={isReview}
          className="bg-primary text-white py-2 w-full rounded-[6px] disabled:bg-gray-400"
        >
          {isReview ? "Reviewed" : " Give Review"}
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md bg-white"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <DialogHeader>
          <DialogTitle>Submit Your Review</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          {/* Star Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={30}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          {rating === 0 && (
            <p className="text-red-500 text-sm">Rating is required</p>
          )}

          {/* Comment */}
          <textarea
            placeholder="Write your comment..."
            className="input-design"
            {...register("comment", { required: "Comment is required" })}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}

          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-[6px]"
            disabled={rating === 0 || isLoading}
          >
            {isLoading ? "Submitting" : " Submit Review"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiveReviewModal;
