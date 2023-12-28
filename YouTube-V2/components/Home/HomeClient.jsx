"use client";

import { FetchCollection } from "@/Hooks/Hooks";
import VideoCard from "./VideoCard";
import SkeletonLoading from "./SkeletonLoading";

const HomeClient = () => {
  const { data, loading } = FetchCollection("video");

  return (
    <>
      <div className="2xl:ml-64 ml-2 pt-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 ml-5 lg:ml-2 xl:ml-0
       md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {loading ? (
            <>
              {[...Array(16)].map((_, i) => (
                <div key={i}>
                  <SkeletonLoading />
                </div>
              ))}
            </>
          ) : (
            <>
              {data.map((video, id) => (
                <div key={id} className="pb-14">
                  <VideoCard {...video} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeClient;
