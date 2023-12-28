"use client";

import { FetchDocument } from "@/Hooks/Hooks";
import Watch from "@/components/Video/Watch";

const VideoClient = ({ params }) => {
  const { document } = FetchDocument("video", params.VideoId);

  return (
    <div className="min-h-screen">
      <div className="desktop:ml-[80px] lg:ml-[60px] ml-2 pt-8 px-4">
        <Watch {...document} />
      </div>
    </div>
  );
};

export default VideoClient;
