"use client";

import { useState, useEffect } from "react";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";

const fields = [
  { key: "fullName", label: "Full Name" },
  { key: "institute", label: "Institute" },
  { key: "phone", label: "Phone Number" },
  { key: "licenceNumber", label: "Licence Number" },
  { key: "experience", label: "Experience (Years)", type: "number" },
  { key: "fee", label: "Fee", type: "number" },
  { key: "location", label: "Location" },
];

const UpdateLawyerDetails = () => {
  const { data: profileData, isLoading: profileLoading } = useProfileQuery("");
  const profile = profileData?.data;
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleChange = (key: string, value: string | number) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await updateProfile(form);
    toast.success("Profile updated successfully");
    setEditMode(false);
  };

  if (profileLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Lawyer Profile</h2>
          <p className="text-gray-500 text-sm">
            Manage and update your professional details
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2.5 bg-primary/10 font-medium text-secondary  rounded-[5px]"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-primary/10 text-secondary rounded-[5px] disabled:bg-gray-400"
            disabled={updating}
          >
            {updating ? "Saving..." : "Save"}
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ key, label, type }) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>

            {!editMode ? (
              <p className="text-gray-900 font-medium bg-gray-50 px-3 py-2 rounded-[5px] border">
                {form?.[key] ?? "Not provided"}
              </p>
            ) : (
              <input
                type={type || "text"}
                value={form?.[key] ?? ""}
                onChange={(e) =>
                  handleChange(
                    key,
                    type === "number" ? +e.target.value : e.target.value,
                  )
                }
                className="border rounded-[5px] px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateLawyerDetails;
