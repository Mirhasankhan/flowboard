"use client";
import Container from "@/utils/Container";
import { JWTDecode } from "@/utils/jwt";
import { Mail, MapPin, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const LawyerOverview = ({ lawyer, isLoading }: { lawyer: any, isLoading: boolean }) => {
  const router = useRouter();
  const { decoded } = JWTDecode();

  const handleBook = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/book?lawyerId=${lawyer._id}`);
  };
  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };

  console.log(lawyer);

  return (
    <Container>
      <div className="grid grid-cols-3 shadow-lg text-black bg-white px-3 lg:px-8 py-6 lg:py-8 gap-6 rounded-[20px]">
        <div className="col-span-3 lg:col-span-1 flex items-center justify-start">
          <Image
            alt=""
            height={200}
            width={700}
            className="object-cover w-full lg:w-[280px] md:h-[480px] lg:h-[240px] rounded-xl"
            src={
              lawyer?.profileImage ||
              "https://res.cloudinary.com/dddrm7ep8/image/upload/v1781532954/y7gdxfkl9uznjt96cjea.png"
            }
          ></Image>
        </div>
        <div className="col-span-3 lg:col-span-2 flex flex-col">
          <div className="flex justify-between border-b pb-4 items-center">
            <div>
              {
                isLoading ? <Skeleton className="h-[38px] w-full lg:w-[260px] rounded-xl" /> : <h1 className="text-2xl lg:text-4xl font-semibold">
                  {lawyer?.fullName}
                </h1>
              }
              {
                isLoading ? <div className="flex mt-4 gap-1 lg:gap-4"> <Skeleton className="h-[30px] w-full lg:w-[150px] rounded-xl" /> <Skeleton className="h-[30px] w-full lg:w-[150px] rounded-xl" /></div> : <div className="flex gap-1 lg:gap-4 mt-4">
                  {lawyer?.specialization?.map((s: any) => (
                    <h1
                      key={s._id}
                      className="px-2 py-1 text-sm bg-primary/10 rounded-[4px] text-secondary  font-medium"
                    >
                      {s.serviceName}
                    </h1>
                  ))}
                </div>
              }
            </div>
            <div>
              <MessageCircleMore
                onClick={() => handleMessage()}
                size={30}
                className="text-secondary hidden lg:block cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2 border-b py-4 items-center">
            <div>
              {
                isLoading ? <Skeleton className="h-[24px] w-full lg:w-[70px] rounded-xl" /> :  <h1 className="text-secondary font-medium text-xl">
                {lawyer?.avgRating}
              </h1>
              }
              {
                isLoading ? <Skeleton className="h-[16px] w-full lg:w-[70px] mt-2 rounded-xl" /> : <p className="text-gray-500 text-sm">
                {lawyer?.totalReview} reviews
              </p>
              }
            </div>
            <div>
              {
                isLoading ? <Skeleton className="h-[24px] w-full lg:w-[70px] rounded-xl" /> : <h1 className="text-secondary font-medium text-xl">
                  ${lawyer?.fee}
                </h1>
              }
              <p className="text-gray-500 text-sm">per consultation</p>
            </div>
            <div>
              {
                isLoading ? <Skeleton className="h-[24px] w-full lg:w-[170px] rounded-xl" /> : <h1 className="text-secondary font-medium lg:text-xl">
                  {lawyer?.serviceType === "Both"
                    ? "Online & In Person"
                    : lawyer?.serviceType === "In_Person"
                      ? "In Person"
                      : lawyer?.serviceType === "Online"
                        ? "Online"
                        : ""}
                </h1>
              }
              <p className="text-gray-500 text-sm">consultation type</p>
            </div>
          </div>
          <div className="lg:flex gap-2 pt-4 justify-between">
            {
              isLoading ? <Skeleton className="h-[24px] w-full lg:w-[140px] mt-2 rounded-xl" /> : <div className="flex gap-1 items-center">
                <MapPin size={18} className="text-secondary"></MapPin>
                <h1 className="text-gray-900">{lawyer?.location}</h1>
              </div>
            }

            {
              isLoading ? <Skeleton className="h-[24px] w-full lg:w-[180px] mt-2 rounded-xl" /> : <div className="flex gap-1 py-2 lg:py-0 items-center">
                <Mail size={18} className="text-secondary"></Mail>
                <h1 className="text-gray-900">{lawyer?.email}</h1>
              </div>
            }
            <div className="flex">
              <button
                className="bg-purple-500 text-white px-4 w-full lg:w-auto py-2 font-medium rounded-[5px]"
                onClick={() => handleBook()}
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LawyerOverview;
