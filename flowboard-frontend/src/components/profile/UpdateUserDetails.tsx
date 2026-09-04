"use client";

import { useState, useEffect } from "react";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";

const fields = [
  { key: "fullName", label: "Full Name" },
  { key: "phone", label: "Phone Number" },
  { key: "location", label: "Location" },
];

const UpdateUserDetails = () => {
  const { data: profileData, isLoading: profileLoading } = useProfileQuery("");
  const profile = profileData?.data;
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await updateProfile(form);
    toast.success("Profile updated successfully");
    setEditMode(false);
  };

  if (profileLoading)
    return (
      <div className="bg-white border rounded-2xl shadow-sm p-6 mt-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-56 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Profile Details</h2>
          <p className="text-gray-500 text-sm">
            Update your basic account information
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 font-medium py-2.5 bg-primary/10 text-secondary rounded-full"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-primary/10 text-secondary rounded-full disabled:bg-gray-200"
            disabled={updating}
          >
            {updating ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ key, label }) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>

            {!editMode ? (
              <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-[8px] border">
                {form?.[key] ? form[key] : "Not provided"}
              </p>
            ) : (
              <input
                type="text"
                value={form?.[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border rounded-[8px] px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateUserDetails;
