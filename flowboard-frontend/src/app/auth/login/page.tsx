"use client";

import { useForm, SubmitHandler } from "react-hook-form";
// import { FaGithub } from "react-icons/fa6";
import logo from "../../../assets/logo.main.png";
import Image from "next/image";
import { TLoginValues } from "@/types/common";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
// import { FcGoogle } from "react-icons/fc";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>();

  const onSubmit: SubmitHandler<TLoginValues> = async (data) => {
    try {
      const response: any = await loginUser(data);

      if (response.data?.data?.accessToken) {
        toast.success("Login Successful");

        router.push("/");
        dispatch(
          setUser({
            name: response.data.data.userInfo.fullName,
            email: response.data.data.userInfo.email,
            role: response.data.data.userInfo.role,
            token: response.data.data.accessToken,
          })
        );
        Cookies.set("token", response.data?.data.accessToken);
      } else if (response.error) {
        toast.error(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    } finally {
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen flex items-center justify-center">
      <div className="w-full md:w-2/5 xl:w-1/3 2xl:w-1/4 shadow-md mx-2 md:mx-auto py-12 px-6 dark:text-white bg-white rounded-[10px]">
        <div className="flex flex-col items-center">
          <Image
            placeholder="blur"
            src={logo}
            alt=""
            height={150}
            width={150}
          ></Image>
          {/* <h1 className="text-3xl font-semibold py-2 ">Welcome Back</h1>
          <p className="text-sm text-gray-600">Access unlimited data & information</p> */}
          <h1 className="text-sm text-gray-600">
            <span className="font-medium">Lawyer email:</span> keith@gmail.com |
            pass: 123456
          </h1>
          <h1 className="text-sm text-gray-600">
            <span className="font-medium">User email:</span> hassan@gmail.com |
            pass: 123456
          </h1>
          {/* <h1 className="pt-3">Email: mirhasan000034@gmail.com</h1>
          <p>Password: 123456</p> */}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg pt-6 bg-white"
        >
          <div className="mb-4">
            <label className="label-design pb-1">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input-design"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="label-design pb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input-design"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember Me
              </label>
            </div>
            <Link
              href="/auth/reset-password"
              className="text-secondary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {/* <button
            disabled={isLoading}
            type="submit"
            className="bg-primary text-white py-3 w-full font-medium rounded-[4px]"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button> */}
          <button
            disabled={isLoading}
            type="submit"
            className="text-[#FFF] py-2 font-semibold rounded-[4px] w-full bg-primary"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 inline mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>Sign In</>
            )}
          </button>
        </form>
        {/* <div className="flex items-center justify-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">Or, Login with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div> */}
        {/* <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "https://glamvibe-frontend.vercel.app/",
            })
          }
          disabled={isLoading}
          type="submit"
          className="bg-white flex items-center gap-2 justify-center border py-3 w-full rounded-md"
        >
          <FcGoogle size={20} /> Sign In With Google
        </button>
        <button
          onClick={() =>
            signIn("github", {
              callbackUrl: "https://glamvibe-frontend.vercel.app/",
            })
          }
          disabled={isLoading}
          type="submit"
          className="bg-white flex items-center gap-2 justify-center border py-3 w-full rounded-md mt-3"
        >
          <FaGithub size={20} /> Sign In With Github
        </button> */}
        <div className="text-center text-gray-700 pt-4">
          Dont have an account?
          <Link href="/auth/register" className="text-secondary hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
