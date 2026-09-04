"use client";

import { motion } from "framer-motion";
import lawyerImage from "../../assets/lawyer.jpg";
import Image from "next/image";
import Container from "@/utils/Container";
import { Star, CheckCircle2, MessageSquareQuote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Business Owner",
    company: "TechStart Inc.",
    caseType: "Corporate & Contract Law",
    message:
      "The legal consultation I received was exceptional. The lawyer was professional, knowledgeable, and helped me navigate complex business regulations with ease. Highly recommend this platform!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Real Estate Developer",
    company: "Urban Properties",
    caseType: "Property & Lease Dispute",
    message:
      "I found the perfect lawyer for my property dispute within minutes. The platform is user-friendly, and the lawyers are highly qualified. Saved me significant time and legal friction!",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder & Creative Director",
    company: "Creative Studios LLC",
    caseType: "Intellectual Property & Trademark",
    message:
      "Outstanding service! The attorney I connected with provided clear guidance on our trademark and copyright registrations. The entire process was smooth and professional from start to finish.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-100" id="testimonials">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-4 border border-teal-100">
            <MessageSquareQuote className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Client Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Trusted by Individuals & Businesses
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Real experiences from clients who successfully secured certified legal representation through Juri Link.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200/80 hover:border-teal-500/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars & Case Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {testimonial.caseType}
                  </span>
                </div>

                {/* Message */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.message}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100">
                <div className="relative">
                  <Image
                    src={lawyerImage}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 fill-teal-50" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {testimonial.role} &bull; <span className="text-slate-700 font-medium">{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
