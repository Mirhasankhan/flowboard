"use client";

import Container from "@/utils/Container";
import Image from "next/image";
import inPerson from "../../assets/in-persn.jpg";
import { CheckCircle2, ArrowRight, Building2, MapPin, Users2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "In-Depth Case Analysis & Strategy",
    desc: "Review physical documents, contracts, and evidence face-to-face with your attorney.",
  },
  {
    title: "Personalized Direct Guidance",
    desc: "Deep dive into nuanced jurisdictional nuances that remote text chats cannot replicate.",
  },
  {
    title: "Actionable Representation Plan",
    desc: "Leave your consultation with crystal-clear legal steps and timeline expectations.",
  },
];

const ForInPerson = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/lawyers?serviceType=In_Person`);
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            className="lg:col-span-6 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold tracking-wider uppercase mb-4 w-fit">
              <Building2 className="w-3.5 h-3.5 text-secondary" />
              <span>In-Person Consultation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-4">
              Meet Face-to-Face with <br />
              <span className="text-secondary">Premier Legal Counsel</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Connect directly with highly experienced legal professionals for clear, face-to-face guidance tailored to your specific situation. Review sensitive files securely and plan your strategy with confidence.
            </p>

            {/* Benefit Checklist */}
            <div className="space-y-4 mb-8">
              {benefits.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs"
                >
                  <div className="p-1 rounded-full bg-teal-50 text-teal-600 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={handleNavigate}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm py-3.5 px-7 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Find In-Person Lawyers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white">
              <Image
                src={inPerson}
                alt="In-Person Legal Consultation"
                height={600}
                width={800}
                priority
                className="object-cover h-[440px] sm:h-[480px] w-full"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-xs font-bold text-slate-800">
                  Local Jurisdiction Experts
                </span>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/30 text-teal-300">
                  <Users2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">Confidential & Direct</div>
                  <div className="text-[11px] text-slate-300">Private office consultation</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ForInPerson;
