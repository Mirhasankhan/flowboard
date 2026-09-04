import Image from "next/image";
import bgImage from "../../assets/about.webp";
import Container from "@/utils/Container";
import avvo from "../../assets/avvo.jpg";
import Testimonials from "@/components/home/Testi";

const AboutUsPage = () => {
  return (
    <div>
      <section className="relative w-full h-[60vh]">
        {/* Background Image */}
        <Image
          src={bgImage}
          alt="About Us Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay (optional but recommended) */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Changing how people get legal help
          </h1>
          <p className="max-w-2xl text-base md:text-lg">
            We are committed to delivering quality, trust, and innovation in
            everything we build.
          </p>
        </div>
      </section>
      <Container>
        <h1 className="py-6 font-medium md:text-3xl">Our Story</h1>
        <p>
          Founded in 1995, Juri Link has built a strong reputation for
          integrity, expertise, and an unwavering commitment to clients. What
          began as a small partnership has grown into a full-service firm
          recognized for delivering reliable and effective legal solutions
          across multiple practice areas. <br />{" "}
          <span className="block pt-6">
            At Juri Link, we believe exceptional legal counsel goes beyond
            knowing the law. It requires a deep understanding of our clients’
            goals, challenges, and long-term interests. Our approach blends
            legal expertise with strategic thinking and genuine partnership,
            allowing us to provide clear guidance and practical solutions in
            even the most complex matters.
          </span>
        </p>
        <div className="grid my-6 lg:grid-cols-2">
          <Image
            className="hidden lg:block"
            src={avvo}
            height={800}
            width={800}
            priority
            alt=""
          ></Image>
          <div className="bg-gray-800 flex lg:py-4 p-8 flex-col justify-center text-white">
            <h1 className="text-4xl font-medium lg:pb-2 pb-5">
              Why Juri Link?
            </h1>
            <p>
              At Juri Link, we combine proven legal expertise with a
              client-first mindset to deliver solutions that are clear,
              strategic, and results-driven. We don’t offer generic legal
              answers. Every case, client, and challenge is approached with
              focused attention and tailored strategy. Our strength lies in how
              we work: transparent communication, practical guidance, and
              unwavering advocacy. From individuals to growing businesses,
              clients choose Juri Link because they value trust, responsiveness,
              and a legal partner who thinks beyond the immediate issue to
              protect their long-term interests.
            </p>
          </div>
        </div>
        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default AboutUsPage;
