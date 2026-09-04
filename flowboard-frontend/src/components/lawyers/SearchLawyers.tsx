import Container from "@/utils/Container";
import React from "react";

const SearchLawyers = () => {
  return (
    <div className="bg-gradient-to-r from-black to-pink-500 py-16">
      <Container>
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl lg:text-6xl font-medium">Find Qualified Lawyers</h1>
          <p className="text-center py-4">
            Browse through our network of experienced legal professionals and
            find the <br />
            right lawyer for your needs.
          </p>

          {/* Search Bar */}
          <div className="w-full xl:w-4/6">
            <div className="grid grid-cols-2 md:grid-cols-8 gap-4 text-black">
              <input
                className="py-3 focus:outline-none col-span-1 md:col-span-3 w-full rounded-[8px] px-4"
                type="text"
                placeholder="Search by law name or specialization"
              />
              <input
                className="py-3 focus:outline-none col-span-1 md:col-span-3 w-full rounded-[8px] px-4"
                type="text"
                placeholder="Location..."
              />
              <button className="col-span-2 md:col-span-2 px-8 py-3 rounded-[4px] border border-white text-white font-medium w-full md:w-auto">
                Search Lawyers
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchLawyers;
