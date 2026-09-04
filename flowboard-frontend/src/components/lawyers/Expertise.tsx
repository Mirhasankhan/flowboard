import { Award } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";

const Expertise = ({ lawyer, isLoading }: { lawyer: any, isLoading: boolean }) => {
  return (
    <div className="border bg-white p-6 rounded-[12px]">
      <div className="border-b-[0.5px] border-primary pb-6 ">
        <div className="flex items-center gap-2">
          <Award className="text-secondary"></Award>
          <h1 className="text-xl font-medium">Areas of Expertise</h1>
        </div>
        {
          isLoading ? <div className="grid grid-cols-2 lg:grid-cols-3 pt-3 gap-5"><Skeleton className="h-[50px] w-full lg:w-[250px] rounded-xl" /> <Skeleton className="h-[50px] w-full lg:w-[250px] rounded-xl" /> </div> : <div className="grid grid-cols-2 lg:grid-cols-3 pt-3 text-center gap-5">
            {lawyer?.specialization?.map((s: any) => (
              <h1
                key={s._id}
                className="w-full py-3 rounded-[6px] bg-primary text-white lg:font-medium"
              >
                {s.serviceName}
              </h1>
            ))}
          </div>
        }
      </div>
      <h1 className="text-xl text-secondary pt-4 font-medium">Abuout Me</h1>
      <p className="text-gray-800 pt-2">
        Sarah Johnson is a highly experienced corporate attorney with over 12
        years of expertise in mergers and acquisitions, securities law, and
        corporate governance. She has successfully represented Fortune 500
        companies in complex transactions worth over $2 billion.
      </p>
    </div>
  );
};

export default Expertise;
