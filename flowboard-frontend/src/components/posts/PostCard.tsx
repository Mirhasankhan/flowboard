"use client";
import {
  MapPin,
  DollarSign,
  Zap,
  Laptop2,
  MessageSquare,
  User,
} from "lucide-react";
import PostDetailModal from "./PostDetailModal";
import { formatDistanceToNow } from "date-fns";
import { JWTDecode } from "@/utils/jwt";
import { IoIosHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToggleLikePostMutation } from "@/redux/features/post/post.api";

const PostCard = ({ post }: { post: any }) => {
  const router = useRouter();
  const [toggleLike] = useToggleLikePostMutation();

  const handleToggleLikePost = async (id: string) => {
    if (decoded?.email) {
      await toggleLike(id);
    } else {
      router.push(`/auth/login`);
    }
  };
  const { decoded } = JWTDecode();
  const hasLiked = post.likedUsers.includes(decoded?.id);

  const handleMessage = (id: string) => {
    if (decoded?.email) {
      router.push(`/messages?receiverId=${id}`);
    } else {
      router.push(`/auth/login`);
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 transition hover:shadow-lg">
      <div className="flex gap-2">
        <Image
          src={
            post?.userId?.profileImage ||
            "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
          }
          alt="profile"
          width={48}
          height={48}
          className="object-cover h-16 w-16 rounded-full"
          quality={100}
        />

        <div>
          <div>
            <h1 className="font-medium text-xl">
              {post?.userId?.fullName}{" "}
              <span className="text-gray-500 text-xs">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </h1>
            <div className="flex gap-1 mt-1">
              <h1 className="inline-block bg-primary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full mb-4">
                {post?.serviceId?.serviceName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-xl font-medium py-3">{post?.title}</h1>
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">
        {post.description}
      </p>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{post.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-500" />
          <span>{post.budget}</span>
        </div>
        {post?.serviceType == "Online" ? (
          <div className="flex items-center gap-2">
            <Laptop2 className="h-4 w-4 text-gray-500" />
            <span>Online Consultation</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span>In Person</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>{post.urgencyLevel}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-2">
        <div className="flex gap-8">
          <div className="flex items-center text-gray-500 gap-1">
            <IoIosHeart
              className={`${hasLiked ? "text-red-600" : ""} cursor-pointer`}
              onClick={() => handleToggleLikePost(post.id)}
              size={20}
            ></IoIosHeart>
            <p className="font-medium">{post.likedUsers.length}</p>
          </div>
          <PostDetailModal id={post._id}></PostDetailModal>
        </div>
        <button
          onClick={() => handleMessage(post?.userId?._id)}
          className="flex items-center gap-2 text-sm text-white font-medium px-2 rounded-[6px] bg-primary py-1"
        >
          <MessageSquare size={15}></MessageSquare>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default PostCard;
