"use client";

import ServiceHero from "@/components/shared/ServiceBanner";
import { SkeletonCard } from "@/components/shared/Skeleton";
import { useServicesQuery } from "@/redux/features/services/services.api";
import Container from "@/utils/Container";
import { Scale } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  const { data: legalServies } = useServicesQuery("");
  console.log("legalServies", legalServies);
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <ServiceHero></ServiceHero>
     <Container>
  {/* Header Section */}
  <div className="py-12 text-center">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      Areas of Legal Expertise
    </h1>
    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Explore our expert practice areas—from Family Law to Real Estate and
      beyond, tailored to protect your rights and interests.
    </p>
  </div>

  {/* Services Grid */}
  {legalServies?.data?.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
      {legalServies?.data?.map((service: any) => (
        <div
          key={service._id}
          className="h-full bg-white rounded-[12px] border border-gray-200 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
        >
          {/* Icon Badge */}
          <div className="mb-4 w-12 h-12 bg-primary rounded-[10px] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Scale size={22} />
          </div>

          {/* Service Name */}
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
            {service?.serviceName}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
            {service?.importance}
          </p>

          {/* CTA Button */}
          <Link
            href={`/services/${service._id}`}
            className="mt-auto inline-flex items-center justify-center gap-2 w-full border border-primary text-primary font-medium text-sm py-2.5  hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            Find a Lawyer in {service?.serviceName}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
      {Array.from({ length: 12 }).map((_, idx) => (
        <SkeletonCard height={160} key={idx} />
      ))}
    </div>
  )}
</Container>
    </div>
  );
};

export default ServicesPage;
