"use client";

import Moment from "react-moment";

import { FormatNumber } from "@/Hooks/Hooks";
import VideoPlayer from "./VideoPlayer";
import Comments from "./Comments";
import Recommended from "./Recommended";
import Buttons from "./Buttons";

const Watch = ({
  Title,
  ChannelName,
  ChannelImage,
  ChannelEmail,
  createdAt,
  id,
  VideoUrl,
  Description,
  ChannelId,
  Category,
  Views,
  Tumbnail,
}) => {
  if (!ChannelName) {
    return null;
  }

  return (
    <div className="xl:flex block z-10 gap-9">
      <div className="desktop:max-w-[1300px] xl:max-w-[800px] lg:max-w-[1000px]">
        <div className="space-y-3">
          <VideoPlayer
            ChannelImage={ChannelImage}
            VideoUrl={VideoUrl}
            Tumbnail={Tumbnail}
            id={id}
            views={Views}
          />
          <div className="relative">
            <div className="font-extrabold text-xl">
              <h2>{Title}</h2>
            </div>
            <Buttons
              ChannelName={ChannelName}
              ChannelImage={ChannelImage}
              ChannelEmail={ChannelEmail}
              id={id}
              ChannelId={ChannelId}
            />
          </div>
          <div
            className="dark:bg-darkActive bg-lightActive p-2 rounded-xl
          font-semibold text-base cursor-pointer hover:bg-lightBorder dark:hover:bg-cardHover"
          >
            <div className="flex gap-2">
              <p>{FormatNumber(Views)} Views</p>
              <Moment fromNow>{createdAt}</Moment>
            </div>
            <div>{Description}</div>
          </div>
        </div>
        <Comments VideoId={id} />
      </div>
      <div className="mt-3 lg:mt-0">
        <h3 className="text-lg font-bold">Recommended</h3>
        <Recommended ChannelEmail={ChannelEmail} Category={Category} />
      </div>
    </div>
  );
};

export default Watch;
