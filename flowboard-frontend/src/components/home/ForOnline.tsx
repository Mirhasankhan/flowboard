"use client";
import Container from "@/utils/Container";
import Image from "next/image";
import online from "../../assets/online.jpg";
import { GiCheckMark } from "react-icons/gi";
import { useRouter } from "next/navigation";

const ForOnline = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/lawyers?serviceType=Online`);
  };
  return (
    <Container>
      <div className="grid grid-cols-2 gap-8 my-24">
        {/* <div className="col-span-1 relative w-4/5 h-[430px] overflow-hidden shadow-lg [clip-path:polygon(0%_0%,100%_10%,100%_90%,0%_100%)]">
          <Image src={online} alt="alt" fill className="object-cover" />
        </div> */}
        <div className="col-span-1 hidden lg:block">
          <Image
            src={online}
            alt="alt"
            height={200}
            width={800}
            priority
            className=" rounded-[30px] "
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <p className="text-secondary uppercase tracking-widest font-medium">ONLINE CONSULTATION</p>

          <h1 className="text-3xl font-bold py-5">
            Get Instant Access to Trusted Legal
            <span className="text-secondary"> Trusted Legal</span> Professionals
          </h1>

          <p className="text-gray-500 pb-6">
            Get immediate access to top legal professionals from the comfort of
            your home. Our experts review your case, provide clear guidance, and
            help you take the right steps without the hassle of travel or
            scheduling delays. Fast, reliable, and secure — online legal advice
            designed to fit your life.
          </p>

          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              Fast legal answers with no in-person appointment needed
            </p>
          </div>

          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              Secure video or chat sessions with verified legal experts
            </p>
          </div>

          <div className="flex items-center gap-1">
            <GiCheckMark className="text-secondary" />
            <p className="text-gray-500">
              Action-oriented advice tailored to your case in real time
            </p>
          </div>

          <button
            onClick={() => handleNavigate()}
            className="bg-primary/10 mt-6 font-medium text-secondary py-2 px-5 rounded-[5px]"
          >
            View Online Lawyers
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ForOnline;
