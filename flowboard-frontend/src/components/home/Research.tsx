"use client";
import Container from "@/utils/Container";
import Link from "next/link";

const Research = () => {
  return (
    <section className="bg-[#f8f8f8] py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <p className="text-secondary font-medium mb-3">
            No searching. No endless calls.
          </p>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Post your legal need — let verified lawyers come to you
          </h2>

          {/* Supporting copy */}
          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            Describe your issue, choose urgency, and decide whether you want
            online or in-person support. Qualified lawyers reach out directly,
            so you compare responses instead of chasing profiles.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="bg-white p-6 rounded-[8px] shadow-sm">
              <span className="text-secondary font-bold text-lg">01</span>
              <h4 className="font-semibold mt-2">Describe your issue</h4>
              <p className="text-gray-500 text-sm mt-1">
                Explain your legal need in plain language.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] shadow-sm">
              <span className="text-secondary font-bold text-lg">02</span>
              <h4 className="font-semibold mt-2">Set urgency & mode</h4>
              <p className="text-gray-500 text-sm mt-1">
                Choose how fast you need help and how you want to connect.
              </p>
            </div>

            <div className="bg-white p-6 rounded-[8px] shadow-sm">
              <span className="text-secondary font-bold text-lg">03</span>
              <h4 className="font-semibold mt-2">Lawyers reach out</h4>
              <p className="text-gray-500 text-sm mt-1">
                Verified lawyers contact you with guidance or offers.
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link href="/create-post">
            <button className="mt-12 bg-primary text-white py-3 px-8 rounded-[8px] font-medium hover:opacity-90 transition">
              Post your legal need
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Research;
