"use client";

import Image from "next/image";
import lawyerImage from "../../assets/lawyer.jpg";
import Container from "@/utils/Container";
import { motion } from "framer-motion";
import { Clock, ShieldCheck, ArrowRight, TrendingUp, Briefcase, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: TrendingUp,
    title: "Grow your client base",
    description: "Access a steady stream of pre-screened, high-intent client inquiries daily.",
    color: "text-teal-600 bg-teal-50 border-teal-100",
  },
  {
    icon: Clock,
    title: "Flexible schedule & rates",
    description: "Set your own hourly or fixed consultation fees and manage availability on your terms.",
    color: "text-sky-600 bg-sky-50 border-sky-100",
  },
  {
    icon: ShieldCheck,
    title: "Secure escrow payments",
    description: "Guaranteed, automated payouts directly to your account with zero billing friction.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    icon: Briefcase,
    title: "Integrated practice tools",
    description: "Built-in video consultations, direct messaging, and document management.",
    color: "text-slate-700 bg-slate-100 border-slate-200",
  },
];

const ForLawyer = () => {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT SECTION */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-wider uppercase mb-4 w-fit border border-slate-200">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span>For Legal Practitioners</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-4">
              Are You an Attorney? <br />
              <span className="text-primary">Expand Your Legal Practice</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Join qualified attorneys on Juri Link. Connect with verified clients looking for your specific practice expertise, streamline consultations, and grow your practice.
            </p>

            {/* Feature Cards 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg border ${feat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-0.5">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/auth/register-lawyer">
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200">
                  <span>Join As a Lawyer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Verified credentials required</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/10 to-primary/10 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl bg-white">
              <Image
                src={lawyerImage}
                height={800}
                width={800}
                priority
                alt="Professional Lawyer"
                className="object-cover h-[460px] sm:h-[500px] w-full"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">Verified Network</div>
                  <div className="text-[10px] text-slate-500">Top 5% Legal Talent</div>
                </div>
              </div>

              {/* Bottom Floating Badge */}
              <div className="absolute bottom-4 right-4 left-4 sm:left-auto bg-slate-900/90 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">+40% Growth</div>
                  <div className="text-[11px] text-slate-300">Average client roster increase</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ForLawyer;
