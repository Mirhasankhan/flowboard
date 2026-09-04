"use client";

import PostFilters from "@/components/lawyers/PostFilters";
import PostCard from "@/components/posts/PostCard";
import Container from "@/utils/Container";
import React, { useState } from "react";
import { Funnel, Plus, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SkeletonCard } from "@/components/shared/Skeleton";
import { usePostsQuery } from "@/redux/features/post/post.api";

const PostsPage = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [selectedService, setSelectedService] = useState<string | null>("");
  const [selectedLegal, setSelectedLegal] = useState<string | null>("");
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>("");

  const { data: posts, isLoading } = usePostsQuery({
    serviceId: selectedLegal,
    level: selectedUrgency,
    serviceType: selectedService,
  });

  const toggleFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="py-6 bg-[#f8f8f8] min-h-screen">
      {/* Mobile Filters */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg p-4 lg:hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={toggleFilters}>
                <X size={24} />
              </button>
            </div>

            <PostFilters
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <Container>
        <div className="grid grid-cols-4 gap-5 mt-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block col-span-1">
            <PostFilters
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedLegalService={selectedLegal}
              setSelectedLegalService={setSelectedLegal}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
            />
          </div>

          {/* Posts */}
          <div className="col-span-4 lg:col-span-3">
            {posts?.data?.length > 0 ? (
              <div>
                <div className="flex justify-between items-center pb-6">
                  <h1 className="lg:text-xl font-medium">
                    Discover the Content: ({posts?.data?.length}) Post Available
                    for You to Explore
                  </h1>

                  <button
                    onClick={toggleFilters}
                    className="lg:hidden font-medium border px-4 py-1 rounded-[6px] flex gap-2 items-center"
                  >
                    <Funnel size={18} />
                    Filters
                  </button>
                  <Link href="/create-post">
                    <button className="hidden bg-primary/10 text-secondary font-medium border px-4 py-1 rounded-[6px] lg:flex gap-2 items-center">
                      <Plus size={18} />
                      Create Post
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {posts?.data
                    ?.slice()
                    .reverse()
                    .map((post: any) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                </div>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="grid grid-col-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 2 }).map((_, idx) => (
                      <SkeletonCard height={350} key={idx} />
                    ))}
                  </div>
                ) : (
                  <div className=" flex flex-col mt-16 items-center">
                    <div className="bg-primary/10 text-secondary p-6 rounded-full">
                      <Search size={40}></Search>
                    </div>
                    <h1 className="text-2xl font-medium py-2">
                      Now Posts Found
                    </h1>
                    <p className="text-gray-600 ">
                      We couldn&apos;t find any posts matching your search, Try
                      adjusting your criteria.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostsPage;
