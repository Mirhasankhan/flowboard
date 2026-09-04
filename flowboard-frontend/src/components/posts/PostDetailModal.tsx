import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateCommentMutation,
  useCreateReplyMutation,
  usePostQuery,
} from "@/redux/features/post/post.api";

import { JWTDecode } from "@/utils/jwt";
import { MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PostDetailModal = ({ id }: { id: string }) => {
  const { data: post } = usePostQuery(id);
  const router = useRouter();
  const { decoded } = JWTDecode();
  const [message, setMessage] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [visibleReplies, setVisibleReplies] = useState<string | null>(null); // 👈 control which comment’s replies are visible

  const { userId, comments = [] } = post?.data || {};
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const [createReply, { isLoading: isReplyLoading }] = useCreateReplyMutation();

  const handleComment = async () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    if (!message.trim()) return;
    const data = { postId: id, message };
    const response = await createComment(data);
    console.log(response);
    setMessage("");
  };

  const handleReply = async (commentId: string) => {
    if (!decoded?.email) return router.push(`/auth/login`);
    if (!replyMessage.trim()) return;
    const data = { commentId, message: replyMessage };
    const response = await createReply(data);
    console.log(response);
    setReplyMessage("");
    setActiveReplyId(null);
  };

  const toggleReplies = (commentId: string) => {
    setVisibleReplies(visibleReplies === commentId ? null : commentId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center text-gray-500 gap-1 cursor-pointer">
          <MessageCircle size={20} />
          <p className="font-medium">{comments.length}</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white !rounded-[8px] p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>
            Comments of {userId?.fullName ?? "Unknown"}&apos;s post
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No comments yet</p>
          ) : (
            comments.map((c: any) => (
              <div key={c._id} className="flex gap-3">
                <Image
                  className="rounded-full object-cover h-12 w-12"
                  height={40}
                  width={40}
                  src={c.userId.profileImage}
                  alt="profile"
                />
                <div className="flex-1">
                  <div className="flex gap-3 items-center">
                    <h1 className="text-sm font-semibold">
                      {c.userId.fullName}
                    </h1>
                    <p className="text-xs text-gray-500">
                      {new Date(c.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <p className="text-gray-700">{c.message}</p>

                  <div className="flex gap-3 mt-1 items-center">
                    <button
                      onClick={() =>
                        setActiveReplyId(activeReplyId === c._id ? null : c._id)
                      }
                      className="text-xs font-medium text-secondary"
                    >
                      Reply
                    </button>

                    {c.replies?.length > 0 && (
                      <button
                        onClick={() => toggleReplies(c._id)}
                        className="text-xs underline text-gray-600"
                      >
                        {visibleReplies === c._id
                          ? "Hide replies"
                          : `View replies (${c.replies.length})`}
                      </button>
                    )}
                  </div>

                  {activeReplyId === c._id && (
                    <div className="mt-2">
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="input-design"
                        placeholder="Write a reply..."
                        rows={2}
                      />
                      <button
                        disabled={!replyMessage || isReplyLoading}
                        onClick={() => handleReply(c._id)}
                        className={`flex ml-auto mt-2 items-center gap-2 px-3 py-2 rounded-[6px] font-medium transition ${
                          replyMessage
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        <Send size={18} />
                        {isReplyLoading ? "Replying..." : "Post Reply"}
                      </button>
                    </div>
                  )}

                  {visibleReplies === c._id && c?.replies?.length > 0 && (
                    <div className="mt-3 pl-6 space-y-3 border-l border-gray-200">
                      {c.replies.map((r: any) => (
                        <div key={r._id} className="flex gap-3">
                          <Image
                            className="rounded-full object-cover h-10 w-10"
                            height={36}
                            width={36}
                            src={r.userId.profileImage}
                            alt="reply profile"
                          />
                          <div>
                            <div className="flex gap-2 items-center">
                              <h1 className="text-sm font-semibold">
                                {r.userId.fullName}
                              </h1>
                              <p className="text-xs text-gray-500">
                                {new Date(r.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })}
                              </p>
                            </div>
                            <p className="text-gray-700 text-sm">{r.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4 bg-white sticky bottom-0">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-design"
            placeholder="Write a comment..."
            rows={2}
          />
          <button
            disabled={!message || isLoading}
            onClick={handleComment}
            className={`flex ml-auto mt-2 items-center gap-2 px-3 py-2 rounded-[6px] font-medium transition ${
              message
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            <Send size={18} />
            {isLoading ? "Commenting..." : "Post Comment"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
