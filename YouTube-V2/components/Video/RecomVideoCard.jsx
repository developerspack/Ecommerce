"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Moment from "react-moment";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";

import { FormatNumber, format } from "@/Hooks/Hooks";
import { db } from "@/lib/firebase";

const RecomVideoCard = ({
  Title,
  Tumbnail,
  ChannelName,
  ChannelId,
  createdAt,
  id,
  Description,
  VideoDuration,
  ChannelImage,
  Views,
  search,
}) => {
  const [item, setItem] = useState(true);

  useEffect(() => {
    if (search === undefined) {
      setItem(false);
    }
  }, [search, item]);

  return (
    <Link href={`/video/${id}`}>
      <div className="flex space-x-3">
        <div
          className={` relative mb-3 dark:bg-loadingDark bg-loadingLight rounded-xl ${
            item ? "h-52" : "h-36"
          }`}
        >
          <Image
            height={500}
            width={500}
            src={Tumbnail}
            className="h-full w-full object-cover rounded-xl"
          />
          <p className="absolute right-0 mr-2 rounded-md bg-dark text-white bottom-2 px-1">
            {format(VideoDuration)}
          </p>
        </div>
        <div>
          <div className="absolute dark:text-loadingLight text-loadingDark">
            <p className="font-semibold text-base line-clamp-2 dark:text-white text-black">
              {Title}
            </p>
            <p className="">
              {FormatNumber(Views)} views
              <span className="text-[24px] leading-none font-bold relative top-[-3px] mx-1">
                .
              </span>
              <Moment fromNow>{createdAt}</Moment>
            </p>
            <div className={item ? "space-y-5 mt-3" : ""}>
              <Link
                href={`/channel/${ChannelId}`}
                className={item ? "gap-3 flex items-center" : ""}
              >
                {item && (
                  <div className="h-8 w-8 rounded-full dark:bg-loadingDark bg-loadingLight">
                    <img
                      className="rounded-full h-full w-full object-cover"
                      src={ChannelImage}
                    />
                  </div>
                )}
                <p className="text-base font-medium hover:font-bold line-clamp-1">
                  {ChannelName}
                </p>
              </Link>
              {item && (
                <p className="text-base font-medium line-clamp-2">
                  {Description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecomVideoCard;
