"use client";

import { useAllLawyersQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import { SkeletonCard } from "../shared/Skeleton";
import NewCard from "../lawyers/NewCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedLawyers = () => {
  const { data: lawyers, isLoading } = useAllLawyersQuery({
    experience: "",
    type: "",
    specializationId: "",
  });

  return (
    <section className="bg-gradient-to-b from-slate-50/80 via-slate-50/40 to-white py-20 border-b border-slate-100">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold tracking-wide uppercase mb-3 border border-teal-100/80">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Top Rated Counsel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Meet Our Featured Lawyers
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Consult with the most sought-after legal minds in the industry, ranked by client success, peer recognition, and verified credentials.
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/lawyers">
              <button className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-primary hover:border-primary/40 font-semibold text-sm shadow-sm hover:shadow transition-all duration-200">
                <span>See All Lawyers</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} height={380} />
              ))
            : lawyers?.data
                ?.slice(0, 4)
                .map((lawyer: any, index: number) => (
                  <motion.div
                    key={lawyer.id || lawyer._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <NewCard lawyer={lawyer} />
                  </motion.div>
                ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedLawyers;
