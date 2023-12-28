"use client";

import { FetchCollection } from "@/Hooks/Hooks";
import SkeletonLoadingFlex from "../search/SkeletonLoadingFlex";
import RecomVideoCard from "../Video/RecomVideoCard";

const ResultClient = ({ searchParams }) => {
  const { data, loading } = FetchCollection("video");
  // Check if searchParams is a string before using toLowerCase
  const FilteredVideo = data.filter((video) =>
    video.Title.toLowerCase().includes(searchParams.query.toLowerCase())
  );
  return (
    <div className="xl:ml-80 ml-10 pt-10">
      {loading ? (
        <>
          {[...Array(16)].map((_, i) => (
            <div key={i}>
              <SkeletonLoadingFlex />
            </div>
          ))}
        </>
      ) : (
        <>
          {FilteredVideo.map((video, id) => (
            <div key={id}>
              <RecomVideoCard {...video} search={searchParams.query} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ResultClient;
