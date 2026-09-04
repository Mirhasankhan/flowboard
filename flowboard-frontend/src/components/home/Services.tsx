"use client";

import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { Scale } from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const OurServices = () => {
  const { data: legalServies } = useServicesQuery("");

  return (
    <Container>
      <h1 className="text-3xl font-bold text-center mb-6">
        Areas of Legal Expertise
      </h1>
      <p className="text-center text-gray-500">
        Explore our expert practice areas—from Family Law to Real Estate and
        beyond, tailored to protect your rights and interests.
      </p>
      <Marquee gradient={false} direction="right" speed={50} pauseOnHover>
        <div className="flex gap-6 my-12">
          {legalServies?.data?.map((service: any) => (
            <Link
              href={`/services/${service._id}`}
              key={service._id}
              className="flex items-center gap-3 border mr-4 rounded-[8px] min-w-[200px] bg-white hover:shadow-xl hover:scale-105 transition transform duration-300 px-8 py-5"
            >
              <div className="p-3 bg-gradient-to-br from-secondary/20 to-secondary/50 rounded-full text-secondary flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <p className="font-semibold text-gray-800">
                {service?.serviceName}
              </p>
            </Link>
          ))}
        </div>
      </Marquee>
    </Container>
  );
};

export default OurServices;
