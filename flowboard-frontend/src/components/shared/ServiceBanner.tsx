import Container from "@/utils/Container";

const ServiceHero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[#eaf0fb] via-[#eef2fa] to-[#e8edf7] border-b border-[#e3e8f0] px-6 py-16 md:px-12">
      <Container>
        <h1 className="font-serif font-bold text-[30px] md:text-[44px] leading-tight text-[#14181f] mb-5">
          Expert Legal Counsel Across
          <br />
          Every Frontier
        </h1>

        <p className="text-base leading-relaxed text-[#5b6573] max-w-xl mb-7">
          Whether you are navigating a complex real estate transaction or
          protecting your digital assets, JuriLink connects you with
          world-class specialists tailored to your specific legal needs.
        </p>

        <div className="flex flex-wrap gap-3.5">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#dde2ea] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a2b4c] hover:border-[#c4cce0] hover:bg-[#f9fafc]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#2f5fd6] shrink-0"
            >
              <path d="M12 2l2.2 1.6 2.7-.3 1 2.5 2.5 1-.3 2.7L22 12l-1.9 2.5.3 2.7-2.5 1-1 2.5-2.7-.3L12 22l-2.2-1.6-2.7.3-1-2.5-2.5-1 .3-2.7L2 12l1.9-2.5-.3-2.7 2.5-1 1-2.5 2.7.3z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Vetted Specialists
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#dde2ea] bg-white px-4 py-2.5 text-sm font-semibold text-[#1a2b4c] hover:border-[#c4cce0] hover:bg-[#f9fafc]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#2f5fd6] shrink-0"
            >
              <path d="M14 2l6 6-9 9-6 1 1-6z" />
              <path d="M3 21h6" />
            </svg>
            Litigation &amp; Advisory
          </button>
        </div>
      </Container>
    </section>
  );
}

export default ServiceHero;