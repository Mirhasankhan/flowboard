"use client";

import { useRegisterRequestMutation } from "@/redux/features/auth/authApi";
import { useServicesQuery } from "@/redux/features/services/services.api";
import { FormValues } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.main.png";

const LawyerSignUpForm = () => {
  const { data: legalServices } = useServicesQuery("");
  const [registerRequest, { isLoading }] = useRegisterRequestMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!selectedFile) {
      setFileError("Law degree image is required");
      return;
    }
    const lawyerData = {
      role: "Lawyer",
      fullName: data.fullName,
      password: data.password,
      email: data.email,
      serviceType: data.serviceType,
      barAssociation: data.barAssociation,
      fee: data.fee,
      specialization: data.specializations,
      experience: data.yearsOfExperience,
      licenceNumber: data.licenseNumber,
    };

    const formData = new FormData();
    formData.append("licenceUrl", selectedFile);
    formData.append("bodyData", JSON.stringify(lawyerData));

    const response: any = await registerRequest(formData);
    console.log(response);
    if (response.data) {
      localStorage.setItem("verify", data.email);

      reset();
      setSelectedFile(null);
      setFileError(null);
      router.push("/auth/verify-email");
      toast.success(response.data.message);
    } else {
      toast.error(response.error.data.message);
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen flex items-center justify-center py-6">
      <div className="w-full  md:w-4/5  lg:w-3/5 xl:w-2/4 shadow-md md:mx-auto mx-2 py-16 px-6 dark:text-white bg-white rounded-[16px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col items-center">
            <Image
              placeholder="blur"
              src={logo}
              alt=""
              height={150}
              width={150}
            ></Image>
            <h2 className="text-3xl text-gray-800 font-bold">
              Lawyer Registration
            </h2>
            <p className="text-gray-700 pb-6">
              Provide your professional details to create your account.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-design pb-1">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
                className="input-design"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-design pb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="input-design"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-design pb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="input-design"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-design pb-1">License Number</label>
              <input
                type="number"
                placeholder="License Number"
                {...register("licenseNumber", {
                  required: "License Number is required",
                })}
                className="input-design"
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">
                  {errors.licenseNumber.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-design pb-1">Years of Experience</label>
              <input
                type="number"
                placeholder="Years of Experience"
                {...register("yearsOfExperience", {
                  required: "Years of Experience is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be at least 0" },
                })}
                className="input-design"
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">
                  {errors.yearsOfExperience.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="label-design pb-1">Law Degree Image</label>
              <input
                className="input-design"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                    setFileError(null);
                  }
                }}
                type="file"
                accept="image/*"
              />
              {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label-design pb-1">Service Type</label>
              <select
                {...register("serviceType", {
                  required: "Service Type is required",
                })}
                className="input-design"
              >
                <option value="">Select Service Type</option>
                <option value="Online">Online</option>
                <option value="In_Person">In Person</option>
                <option value="Both">Online & In Person</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-500 text-sm">
                  {errors.serviceType.message}
                </p>
              )}
            </div>
            <div>
              <label className="label-design pb-1">Fee (per consultation)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Fee (per consultation)"
                {...register("fee", {
                  required: "Fee is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Fee must be positive" },
                })}
                className="input-design"
              />
              {errors.fee && (
                <p className="text-red-500 text-sm">{errors.fee.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Areas of Practice</label>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {legalServices?.data?.map(
                (service: { _id: string; serviceName: string }) => (
                  <label
                    key={service._id}
                    className="flex items-center hover:bg-gray-100 p-2 rounded-xl hover:cursor-pointer space-x-2"
                  >
                    <input
                      className="accent-orange-600 w-5 h-5"
                      type="checkbox"
                      value={service._id}
                      {...register("specializations", {
                        validate: (value) =>
                          value.length > 0 ||
                          "At least one specialization is required",
                      })}
                    />
                    <span>{service.serviceName}</span>
                  </label>
                )
              )}
            </div>
            {errors.specializations && (
              <p className="text-red-500 text-sm">
                {errors.specializations.message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 mt-3 px-4 bg-primary/80 text-white font-medium rounded hover:bg-primary"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="flex border-t pt-4 border-gray-200 text-gray-700 justify-center">
          <h1>Already have an account?</h1>
          <Link
            href="/auth/login"
            className="text-secondary hover:underline ml-1"
          >
            Login
          </Link>
        </div>

        <div className="flex text-gray-700 pt-2 justify-center">
          <h1>Want to register as a user?</h1>
          <Link
            href="/auth/register"
            className="text-secondary hover:underline ml-1"
          >
            Register as user
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LawyerSignUpForm;
