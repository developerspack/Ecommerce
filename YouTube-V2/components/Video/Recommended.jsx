"use client";

import { FetchCollection } from "@/Hooks/Hooks";
import SkeletonLoadingFlex from "../search/SkeletonLoadingFlex";
import RecomVideoCard from "./RecomVideoCard";

const Recommended = ({ ChannelEmail, Category }) => {
  const { data, loading } = FetchCollection("video");

  const FilteredVideo = data.filter(
    (video) =>
      video.ChannelEmail === ChannelEmail || video.Category === Category
  );

  return (
    <div>
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
              <RecomVideoCard {...video} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Recommended;
