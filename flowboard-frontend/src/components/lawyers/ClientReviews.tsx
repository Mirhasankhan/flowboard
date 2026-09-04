import { Star } from "lucide-react";
import Image from "next/image";

const ClientReviews = ({ reviews }: { reviews: any[] }) => {
  return (
    <div className="my-10 border bg-white rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Star className="text-secondary" />
        <h1 className="text-xl font-semibold">
          Client Reviews{" "}
          <span className="text-gray-500">({reviews?.length})</span>
        </h1>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews?.map((review) => (
          <div
            key={review._id}
            className="relative rounded-2xl p-5 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 
                       shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <Image
                src={review?.userId?.profileImage}
                alt="User"
                width={48}
                height={48}
                className="rounded-full"
              />

              <div>
                <h3 className="font-semibold text-gray-800">
                  {review?.userId?.email?.split("@")[0]}
                </h3>

                {/* Stars */}
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Comment */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              “{review.comment}”
            </p>

            {/* Footer */}
            <div className="mt-4 text-xs text-gray-500">
              {new Date(review.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
