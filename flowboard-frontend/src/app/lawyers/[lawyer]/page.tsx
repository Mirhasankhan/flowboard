"use client";
import ClientReviews from "@/components/lawyers/ClientReviews";
import ContactLawyer from "@/components/lawyers/ContactLawyer";
import Expertise from "@/components/lawyers/Expertise";
import LawyerOverview from "@/components/lawyers/LawyerOverview";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import { useParams } from "next/navigation";

const LawyerDetailsPage = () => {
  const { lawyer } = useParams();
  const { data: lawyerDetails, isLoading } = useLawyerDetailsQuery(lawyer);

  return (
    <div className="bg-[#f8f8f8] pt-6">
      <LawyerOverview lawyer={lawyerDetails?.data?.lawyer} isLoading={isLoading}></LawyerOverview>
      <Container>
        <div className="grid grid-cols-3 gap-6 my-8">
          <div className="col-span-3 lg:col-span-2">
            <Expertise lawyer={lawyerDetails?.data?.lawyer} isLoading={isLoading}></Expertise>
            <ClientReviews
              reviews={lawyerDetails?.data?.reviews}
            ></ClientReviews>
          </div>
          <div className="hidden lg:block col-span-1">
            <div className="sticky top-8">
              <ContactLawyer
                lawyer={lawyerDetails?.data?.lawyer}
              ></ContactLawyer>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyerDetailsPage;
