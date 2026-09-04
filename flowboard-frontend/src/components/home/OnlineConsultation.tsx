"use client";

import Container from "@/utils/Container";
import { useRouter } from "next/navigation";
import { CalendarCheck, Video, Scale, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Book Your Consultation",
    description:
      "Choose an experienced lawyer and schedule a meeting at a time that seamlessly suits your schedule.",
  },
  {
    number: "02",
    icon: Video,
    title: "Meet on Zoom",
    description:
      "Discuss your legal matter privately with your lawyer through encrypted, high-definition online video.",
  },
  {
    number: "03",
    icon: Scale,
    title: "Get Legal Direction",
    description:
      "Receive practical legal counsel, strategic next steps, and comprehensive answers to all your questions.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Take Confident Action",
    description:
      "Use your attorney's tailored advice and documentation to confidently resolve your legal situation.",
  },
];

const OnlineConsultation = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/lawyers?serviceType=Online");
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <Video className="w-3.5 h-3.5" />
            <span>Virtual Legal Sessions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Expert Legal Advice, Wherever You Are
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Connect with experienced lawyers through secure online consultations. Get trusted, confidential legal guidance from the comfort of your home or office.
          </p>
        </div>

        {/* Step Cards Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 hover:border-teal-500/50 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-700/60 border border-slate-600 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20 group-hover:text-teal-300 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-teal-400/80 transition-colors">
                      STEP {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-200 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center text-xs text-slate-400 font-medium">
                  <span>Fast & Confidential</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleNavigate}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-primary hover:from-teal-400 hover:to-primary/90 text-white font-semibold text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-lg hover:shadow-teal-500/20 transition-all duration-200"
          >
            <span>View Online Lawyers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default OnlineConsultation;
