"use client";

import { useState } from "react";
import {
  useProfileQuery,
  useUpdateIntroVideoMutation,
} from "@/redux/features/auth/authApi";
import { ReactNextPlayer } from "reactnextplayer";
import { toast } from "react-toastify";

const UpdateIntroVideo = () => {
  const { data: profile, isLoading: profileLoading } = useProfileQuery("");
  const [updateIntroVideo, { isLoading: uploading }] =
    useUpdateIntroVideoMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (profileLoading) return "Loading...";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("files", selectedFile);

    try {
      await updateIntroVideo(formData).unwrap();
      setSelectedFile(null);
      toast.success("Intro video uploaded successfully");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white border mt-3 rounded-2xl space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">Intro Video</h1>

      {/* Current Video */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {profile?.data?.introVideo ? (
          <ReactNextPlayer
            src={profile?.data?.introVideo}
            controls
            height={220}
            width="100%"
            className="rounded-xl"
          />
        ) : (
          <div className="w-full h-[350px] flex items-center justify-center text-gray-400 bg-gray-100">
            No intro video uploaded.
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className="p-5 border rounded-xl bg-gray-50">
        <label className="block text-gray-700 font-medium mb-3">
          Update Your Intro Video
        </label>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white hover:border-gray-500 transition">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-700 cursor-pointer"
          />
        </div>

        {selectedFile && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-700 text-sm">{selectedFile.name}</p>

            <button
              disabled={uploading}
              onClick={handleUpload}
              className="px-5 py-2 bg-primary/10 text-secondary text-sm font-medium rounded-[6px]  disabled:bg-gray-400"
            >
              {uploading ? "Uploading..." : "Update Video"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateIntroVideo;
