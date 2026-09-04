"use client";

import { JWTDecode } from "@/utils/jwt";
import { MessagesSquare, Timer, ArrowUpRight, Video, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";

const NewCard = ({ lawyer }: { lawyer: any }) => {
  const { decoded } = JWTDecode();
  const router = useRouter();

  const handleMessage = () => {
    if (!decoded?.email) return router.push(`/auth/login`);
    router.push(`/messages?receiverId=${lawyer._id}`);
  };

  const getServiceTypeBadge = () => {
    if (lawyer?.serviceType === "Both") {
      return (
        <span className="inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
          <Video className="w-3 h-3 text-teal-400" />
          <span>Online & In Person</span>
        </span>
      );
    }
    if (lawyer?.serviceType === "Online") {
      return (
        <span className="inline-flex items-center gap-1 bg-teal-900/80 backdrop-blur-md text-teal-100 text-[11px] font-medium px-2.5 py-1 rounded-full border border-teal-500/20">
          <Video className="w-3 h-3 text-teal-300" />
          <span>Online Only</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10">
        <Building2 className="w-3 h-3 text-slate-300" />
        <span>In Person</span>
      </span>
    );
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-teal-600/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(46,121,153,0.12)] transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-100 h-[260px] w-full">
        <Image
          src={lawyer?.profileImage || "/placeholder.png"}
          width={400}
          height={400}
          alt={lawyer.fullName || "lawyer"}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Floating Top Bar */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {getServiceTypeBadge()}

          {/* Rating Badge */}
          {lawyer?.avgRating ? (
            <div className="bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-bold text-slate-900 shadow-sm border border-slate-100">
              <FaStar className="text-amber-400 text-xs" />
              <span>{lawyer.avgRating.toFixed(1)}</span>
            </div>
          ) : (
            <div className="bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1 text-[11px] font-medium text-slate-700 shadow-sm border border-slate-100">
              <span>Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1">
        {/* Lawyer Name & Experience */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
            {lawyer?.fullName}
          </h3>
          <span className="shrink-0 inline-flex items-center gap-1 bg-teal-50 text-teal-800 text-xs font-semibold py-0.5 px-2.5 rounded-full border border-teal-100">
            <Timer className="w-3 h-3 text-teal-600" />
            <span>{lawyer?.experience || 0} yrs</span>
          </span>
        </div>

        {/* Legal Services / Specializations */}
        {lawyer?.legalServices && lawyer.legalServices.length > 0 ? (
          <div className="my-3">
            <div className="flex flex-wrap gap-1.5">
              {lawyer.legalServices
                .slice(0, 3)
                .map((service: { _id: string; serviceName: string }) => (
                  <span
                    key={service._id}
                    className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200/60"
                  >
                    {service.serviceName}
                  </span>
                ))}
              {lawyer.legalServices.length > 3 && (
                <span className="inline-block bg-slate-50 text-slate-500 text-xs font-medium px-2 py-1 rounded-md">
                  +{lawyer.legalServices.length - 3}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="my-3 text-xs text-slate-400 italic">
            General Legal Practice
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 mt-auto pt-4 border-t border-slate-100">
          <Link href={`/lawyers/${lawyer._id}`} className="col-span-4">
            <button className="w-full flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 py-2.5 px-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow">
              <span>View Profile</span>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </button>
          </Link>
          <button
            onClick={handleMessage}
            className="col-span-1 bg-slate-100 hover:bg-teal-50 hover:text-primary text-slate-600 rounded-xl transition-all duration-200 flex items-center justify-center border border-slate-200/60"
            title="Send Direct Message"
          >
            <MessagesSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
