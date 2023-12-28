"use client";

import { MdPlaylistAdd } from "react-icons/md";
import {
  AiOutlineDislike,
  AiOutlineDown,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { TbDots, TbShare3 } from "react-icons/tb";
import { IoCutOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BiSolidBellRing } from "react-icons/bi";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";

import {
  FetchLikeDislike,
  FetchSubscribers,
  LikeUnlike,
  Subscribe,
  FormatNumber,
} from "@/Hooks/Hooks";
import { db } from "@/lib/firebase";
import SigInPopUp from "./SigInPopUp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Buttons = ({
  ChannelName,
  ChannelImage,
  ChannelEmail,
  id,
  ChannelId,
}) => {
  const { data: session } = useSession();
  const [signPop, setSignPop] = useState(false);
  const [signPopLike, setSignPopLike] = useState(false);
  const [signPopDislike, setSignPopDislike] = useState(false);
  const [userId, setUserId] = useState("");

  const { isTrueOrFalse: liked, likesCount: likesCount } = FetchLikeDislike(
    "Likes",
    id,
    userId
  );
  const { isTrueOrFalse: Unlike } = FetchLikeDislike("DisLike", id, userId);
  const { isTrueOrFalse: isSubscibed, subscribersCount: subscribersCount } =
    FetchSubscribers(userId, ChannelId);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [liked, isSubscibed, likesCount, subscribersCount, session]);

  const subscribe = () => {
    if (session) {
      try {
        let docToLike = doc(
          collection(db, "subscriptions"),
          `${userId}_${ChannelId}`
        );
        if (isSubscibed) {
          deleteDoc(docToLike);
        } else {
          Subscribe(
            "subscriptions",
            "Subscription Added",
            userId,
            ChannelId,
            ChannelName,
            ChannelImage,
            ChannelEmail
          );
        }
      } catch (err) {
        toast(err);
      }
    } else {
      setSignPop(!signPop);
    }
  };

  const Like = () => {
    if (session) {
      try {
        if (liked) {
          deleteDoc(doc(collection(db, "Likes"), `${userId}_${id}`));
        } else {
          if (Unlike) {
            deleteDoc(doc(collection(db, "DisLike"), `${userId}_${id}`));
          }
          LikeUnlike(
            "Likes",
            userId,
            id,
            ChannelName,
            ChannelImage,
            ChannelEmail
          );
        }
      } catch (err) {
        toast(err);
      }
    } else {
      setSignPopLike(!signPopLike);
    }
  };

  const Dislike = () => {
    if (session) {
      try {
        if (Unlike) {
          deleteDoc(doc(collection(db, "DisLike"), `${userId}_${id}`));
        } else {
          if (liked) {
            deleteDoc(doc(collection(db, "Likes"), `${userId}_${id}`));
          }
          LikeUnlike(
            "DisLike",
            userId,
            id,
            ChannelName,
            ChannelImage,
            ChannelEmail
          );
        }
      } catch (err) {
        toast(err);
      }
    } else {
      setSignPopDislike(!signPopDislike);
    }
  };

  const UserIcon = ({ text, icon }) => {
    return (
      <div
        className="px-3 py-2 bg-lightActive dark:bg-darkActive hover:bg-lightBorder dark:hover:bg-cardHover 
          rounded-full flex items-center gap-2 cursor-pointer"
      >
        {icon}
        {text}
      </div>
    );
  };
  return (
    <div className="desktop:flex block justify-between mt-2">
      <div className="flex gap-8 justify-between mb-2">
        <Link href={`/channel/${ChannelId}`} className="flex gap-2">
          <img
            src={ChannelImage}
            alt={ChannelName}
            className="h-10 w-10 rounded-full"
          />
          <div className="-mt-1">
            <Link href={`/channel/${ChannelId}`}>
              <p className="font-bold text-lg">{ChannelName}</p>
            </Link>
            <p className="text-UploadText text-base lg:mt-0 mt-2">
              {FormatNumber(subscribersCount)} subscribers
            </p>
          </div>
        </Link>
        <div>
          {userId === ChannelId ? (
            <div className="space-x-2 justify-end flex">
              <button className="dark:bg-darkBorder bg-lightActive py-2 px-4 lg:px-4 font-medium rounded-3xl lg:flex hidden">
                Analytics
              </button>
              <button className="dark:bg-darkBorder bg-lightActive py-2 px-4 font-medium rounded-3xl">
                Edit Video
              </button>
            </div>
          ) : (
            <div className="cursor-pointer font-semibold text-base">
              {isSubscibed ? (
                <div
                  className="bg-lightActive dark:bg-darkActive hover:bg-lightBorder
             dark:hover:bg-cardHover font-semibold text-base flex gap-2 px-4 py-2 rounded-full items-center"
                  onClick={() => subscribe()}
                >
                  <BiSolidBellRing className="h-5 w-5" />
                  Subscribed
                  <AiOutlineDown className="h-4 w-4 mt-1" />
                </div>
              ) : (
                <Popover open={signPop} onOpenChange={subscribe}>
                  <PopoverTrigger>
                    <div
                      className="bg-dark hover:bg-dark/90 text-white dark:bg-light dark:hover:bg-light/90 dark:text-dark
                font-semibold text-base flex gap-2 px-4 py-2 rounded-full items-center op"
                    >
                      Subscribe
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="py-4 w-96 px-6 bg-lightActive dark:bg-darkActive">
                    <SigInPopUp
                      title={"Want to subscribe to this channel?"}
                      subtitle={"Sign in to subscribe to this channel"}
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 overflow-auto mt-4 lg:mt-0">
        <div className="flex bg-lightActive dark:bg-darkActive rounded-full items-center">
          <Popover open={signPopLike} onOpenChange={Like}>
            <PopoverTrigger>
              <div
                className="border-r border-r-line dark:border-r-darkBorder rounded-l-full px-4 flex gap-2 items-center
          p-3 cursor-pointer hover:bg-lightBorder dark:hover:bg-cardHover"
              >
                {liked ? (
                  <AiFillLike className="h-6 w-6" />
                ) : (
                  <AiOutlineLike className="h-6 w-6" />
                )}
                {FormatNumber(likesCount)}
                <span className="lg:flex hidden">likes</span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="py-4 w-96 px-6 bg-lightActive dark:bg-darkActive">
              <SigInPopUp
                title={"Want to Like to this channel?"}
                subtitle={"Sign in to Like this video"}
              />
            </PopoverContent>
          </Popover>
          <Popover open={signPopDislike} onOpenChange={Dislike}>
            <PopoverTrigger>
              <div
                className="rounded-r-full px-5 flex gap-2 items-center
          p-3 cursor-pointer hover:bg-lightBorder dark:hover:bg-darkHover"
              >
                {Unlike ? (
                  <AiFillDislike className="h-6 w-6" />
                ) : (
                  <AiOutlineDislike className="h-6 w-6" />
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="py-4 w-96 px-6 bg-lightActive dark:bg-darkActive">
              <SigInPopUp
                title={"Want to Dislike to this channel?"}
                subtitle={"Sign in to Dislike this video"}
              />
            </PopoverContent>
          </Popover>
        </div>
        <UserIcon icon={<TbShare3 className="h-6 w-6" />} text={"Share"} />
        <UserIcon
          className="hidden lg:flex"
          icon={<IoCutOutline className="h-6 w-6" />}
          text={"Clip"}
        />
        <UserIcon
          className="hidden lg:flex"
          icon={<MdPlaylistAdd className="h-6 w-6" />}
          text={"Save"}
        />
        <UserIcon icon={<TbDots className="h-6 w-6" />} />
      </div>
    </div>
  );
};

export default Buttons;
