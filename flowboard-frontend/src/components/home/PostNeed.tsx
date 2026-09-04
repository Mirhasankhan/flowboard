"use client";

import { FileText, Clock, Users, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Container from "@/utils/Container";
import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Describe your issue",
    description:
      "Explain your legal situation in plain language. No complicated paperwork or legal jargon required.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Set timeline & format",
    description:
      "Choose your response urgency and select whether you prefer online video or in-person counsel.",
    icon: Clock,
  },
  {
    step: "03",
    title: "Verified lawyers reach out",
    description:
      "Qualified, vetted attorneys review your request and reach out directly with actionable solutions.",
    icon: Users,
  },
];

const LegalIntakeHero = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="relative rounded-3xl bg-slate-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden border border-slate-800 shadow-2xl">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          {/* Eyebrow & Headline */}
          <div className="relative z-10 max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-5">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>Zero Chasing &bull; Free To Post</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
              Post Your Legal Request. <br />
              Let <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-200">Verified Lawyers</span> Reach You.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Skip endless calls and generic directories. Describe your case in minutes, and let qualified attorneys submit consultation proposals directly to you.
            </p>
          </div>

          {/* 3 Steps Pipeline */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-teal-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        STEP {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA & Trust badge */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Link href="/create-post" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-primary hover:from-teal-400 hover:to-primary/90 text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-teal-500/20 transition-all duration-200"
              >
                <span>Post Your Legal Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>100% Confidential & Free</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LegalIntakeHero;
