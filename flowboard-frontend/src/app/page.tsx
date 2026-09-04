"use client";

import Banner from "@/components/home/Banner";
import FeaturedLawyers from "@/components/home/FeaturedLawyers";
import ForLawyer from "@/components/home/ForLawyer";
import OnlineConsultation from "@/components/home/OnlineConsultation";
import ForInPerson from "@/components/home/ForInPerson";
import LegalIntakeHero from "@/components/home/PostNeed";
import Testimonials from "@/components/home/Testi";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <FeaturedLawyers />
      <ForLawyer />
      <OnlineConsultation />
      <ForInPerson />
      <LegalIntakeHero />
      <Testimonials />
    </main>
  );
};

export default HomePage;
