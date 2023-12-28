"use client";

import { FetchCollection, FetchDocument } from "@/Hooks/Hooks";
import VideoCard from "../Home/VideoCard";
import ChannelHeader from "./ChannelHeader";
import { AiOutlineSearch } from "react-icons/ai";

const ChannelClient = ({ id }) => {
  const { document } = FetchDocument("users", id);

  const { data, loading } = FetchCollection("video");

  const FilterdVideo = data.filter((video) => video.ChannelId === id);

  return (
    <div>
      <ChannelHeader {...document} NoVideo={FilterdVideo.length} />
      <div className="border-b border-darkBorder mt-6 dark:text-lightBorder sticky top-16 z-30 dark:bg-dark bg-light">
        <div className="ml-5 md:ml-12 xl:ml-72 flex lg:gap-20 gap-10 2xl:px-48 lg:px-20 pt-4">
          <p>HOME</p>
          <p className="underline-offset-8 underline dark:text-white">VIDEOS</p>
          <p>PLAYLISTS</p>
          <p>COMMUNITY</p>
          <p>CHANNELS</p>
          <p>ABOUT</p>
          <AiOutlineSearch className="h-7 w-7" />
        </div>
      </div>
      <div className="xl:ml-64 ml-2 pt-4 lg:px-24 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FilterdVideo.map((video, id) => (
            <div key={id} className="pb-12">
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelClient;
