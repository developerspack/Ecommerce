"use client";

import Link from "next/link";
import Moment from "react-moment";
import Image from "next/image";

import { format, FormatNumber } from "@/Hooks/Hooks";

const VideoCard = ({
  Title,
  Tumbnail,
  ChannelName,
  ChannelImage,
  ChannelId,
  createdAt,
  id,
  VideoDuration,
  Views,
}) => {
  const duration = format(VideoDuration);

  return (
    <Link href={`/video/${id}`}>
      <div className="relative pr-2">
        <div className="h-52 w-full relative mb-3 dark:bg-loadingDark bg-loadingLight rounded-xl">
          <Image
            height={500}
            width={500}
            className="w-full h-52 rounded-xl"
            src={Tumbnail}
          />
          <p className="absolute right-0 mr-2 rounded-md bg-dark text-white bottom-2 px-1">
            {duration}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/channel/${ChannelId}`}>
            <div className="h-12 w-12 rounded-full dark:bg-loadingDark bg-loadingLight">
              <img
                className="rounded-full h-full w-full object-cover"
                src={ChannelImage}
              />
            </div>
          </Link>
          <div className="">
            <div className="absolute">
              <p className="font-bold text-lg line-clamp-2 tracking-tighter leading-tight">
                {Title}
              </p>
            </div>
            <div className="absolute pt-11 gap-3">
              <Link
                href={`/channel/${ChannelId}`}
                className="font-semibold hover:font-bold text-UploadText dark:text-VideoText leading-tight"
              >
                {ChannelName}
              </Link>
              <p className="text-UploadText dark:text-VideoText -mt-1.5">
                {FormatNumber(Views)} views
                <span className="text-[24px] leading-none font-bold relative top-[-3px] mx-1">
                  .
                </span>
                <Moment fromNow>{createdAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
