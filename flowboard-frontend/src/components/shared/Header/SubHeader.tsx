import Container from "@/utils/Container";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const SubHeader = () => {
  return (
    <div className="bg-[#282c3c]">
      <Container>
        <div className="md:flex md:py-0 py-2 justify-between items-center ">
          <div className="flex justify-between gap-8">
            <div className="flex items-center gap-2 border-r pr-8">
              <MapPin className="text-secondary font-medium" size={15} />
              <h1 className="font-medium text-sm text-white">
                24 Tech Roqad st Ny 10023
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-secondary font-medium" size={15} />
              <h1 className="font-medium text-sm text-white">
                2Mon-Sat: 9am to 6pm
              </h1>
            </div>
          </div>
          <Link href="/book-appointment">
            <button className="bg-primary hidden md:block p-3 px-6 text-white text-sm font-medium ">
              Get An Appointment
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default SubHeader;
