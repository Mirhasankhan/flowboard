"use client";

import { useRef, useState } from "react";
import {
  useProfileQuery,
  useUpdateprofileImageMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

const UpdateProfileImage = () => {
  const { data: profile, isLoading: profileLoading } = useProfileQuery("");
  const [updateProfileImage] = useUpdateprofileImageMutation();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  if (profileLoading) {
    return (
      <div className="bg-white border rounded-2xl shadow-sm p-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("files", file);

    try {
      await updateProfileImage(formData).unwrap();
      toast.success("Profile image updated");
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 w-full max-w-2xl mx-auto mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Profile Photo</h2>
          <p className="text-sm text-gray-500">
            Click the image to upload a new photo
          </p>
        </div>
        {uploading && (
          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-blue-300 border-t-blue-600 animate-spin" />
            Uploading...
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div
          className="relative group w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          {profile?.data?.profileImage ? (
            <Image
              src={profile.data.profileImage}
              alt="Profile"
              width={112}
              height={112}
              className="w-full p-1 h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Camera className="text-white w-7 h-7" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileImage;
