"use client";

import Filters from "@/components/lawyers/Filters";
import Container from "@/utils/Container";
import { Funnel, Search, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import { useSearchParams } from "next/navigation";
import { SkeletonCard } from "@/components/shared/Skeleton";
import NewCard from "@/components/lawyers/NewCard";

const LawyersPage = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const serviceType = searchParams.get("serviceType");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>("");
  const [selectedService, setSelectedService] = useState<string | null>(
    serviceType || "",
  );
  const [selectedLegal, setSelectedLegal] = useState<string | null>(
    serviceId || "",
  );

  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: selectedYear,
    type: selectedService,
    specializationId: selectedLegal,
  });

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  console.log(lawyers);

  return (
    <div className="bg-[#f8f8f8]">
      {showMobileFilters && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg p-4 lg:hidden"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={toggleFilters}>
              <X size={24} />
            </button>
          </div>
          <Filters
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedLegalService={selectedLegal}
            setSelectedLegalService={setSelectedLegal}
          />
        </motion.div>
      )}

      <Container>
        <div className="grid grid-cols-4 gap-5 py-6">
          <div className="hidden lg:block lg:col-span-1">
            <Filters
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
            />
          </div>
          <div className="col-span-4 lg:col-span-3">
            {lawyers?.data?.length > 0 ? (
              <div>
                <div className="lg:flex justify-between border-b items-center pb-6 mb-6">
                  <div>
                    <h1 className="text-4xl font-semibold pb-3">
                      Find Your Legal Expert
                    </h1>
                    <p className="text-gray-700 text-sm">
                      Connect with top-rated legal professionals tailored to
                      your specific case needs. <br /> Rigorously vetted and
                      ready to advocate for your rights.
                    </p>
                  </div>
                  <button
                    onClick={toggleFilters}
                    className="lg:hidden font-medium border px-4 py-1 mt-2 lg:mt-0 rounded-[6px] flex gap-2 items-center"
                  >
                    <Funnel size={18} />
                    Filters
                  </button>
                  <div className="hidden lg:block border bg-primary/10 text-primary font-medium py-1 px-3 rounded-[9px]">
                    {lawyers?.data?.length} LAWYERS AVAILABLE
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {lawyers?.data.map((lawyer: any) => (
                    <NewCard key={lawyer.id} lawyer={lawyer} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <SkeletonCard height={420} key={idx} />
                    ))}
                  </div>
                ) : (
                  <div className=" flex flex-col mt-16 items-center">
                    <div className="bg-primary/10 text-secondary p-6 rounded-full">
                      <Search size={40}></Search>
                    </div>
                    <h1 className="text-2xl font-medium py-2">
                      Now Lawyers Found
                    </h1>
                    <p className="text-gray-600 ">
                      We couldn&apos;t find any lawyers matching your search,
                      Try adjusting your criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyersPage;
