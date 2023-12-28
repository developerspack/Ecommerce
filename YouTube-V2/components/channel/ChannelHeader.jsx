"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { BiSolidBellRing } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";

import { FetchSubscribers, Subscribe } from "@/Hooks/Hooks";
import { db } from "@/lib/firebase";
import SigInPopUp from "../Video/SigInPopUp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ChannelHeader = ({ id, name, image, email, NoVideo }) => {
  const [userId, setUserId] = useState("");
  const [signPop, setSignPop] = useState(false);

  let ChannelId = id;

  const { data: session } = useSession();
  const { isTrueOrFalse: isSubscibed, subscribersCount: subscribersCount } =
    FetchSubscribers(userId, ChannelId);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [isSubscibed, subscribersCount, session]);

  const subscribe = () => {
    if (session) {
      try {
        let docToLike = doc(collection(db, "subscriptions"), `${userId}_${id}`);
        if (isSubscibed) {
          deleteDoc(docToLike);
        } else {
          Subscribe(
            "subscriptions",
            "Subscription Added",
            userId,
            id,
            name,
            image,
            email
          );
        }
      } catch (err) {
        toast(err);
      }
    } else {
      setSignPop(!signPop);
    }
  };

  if (name === undefined) {
    return null;
  }

  return (
    <div className="mt-16 2xl:px-48 lg:px-20">
      <div className="flex justify-between">
        <div className="flex gap-4 py-2 ml-8 xl:ml-60">
          <img src={image} className="h-32 w-32 rounded-full" />
          <div className="space-y-2">
            <p className="text-xl font-bold">{name}</p>
            <span className="md:block xl:flex gap-2 text-base text-UploadText">
              <p className="lowercase">@{name.replace(/\s/g, "")}</p>
              <p className="">{subscribersCount} subsribers</p>
              <p className="">{NoVideo} videos</p>
            </span>
          </div>
        </div>

        {session ? (
          <div>
            {session.user.id === id ? (
              <div className="space-x-2 justify-end">
                <button className="dark:bg-darkBorder bg-loadingLight p-4 font-semibold rounded-full">
                  Customize channel
                </button>
                <button className="dark:bg-darkBorder bg-loadingLight p-4 font-semibold rounded-full">
                  Manage videos
                </button>
              </div>
            ) : (
              <div className="cursor-pointer font-semibold text-base lg:mr-0 mr-4">
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
        ) : (
          <div className="cursor-pointer font-semibold text-base lg:mr-0 mr-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelHeader;
