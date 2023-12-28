"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { MdOutlineSort } from "react-icons/md";
import { toast } from "react-hot-toast";
import Moment from "react-moment";
import EmojiPicker from "emoji-picker-react";

import { CommentOnVideo, FetchWhereSimple } from "@/Hooks/Hooks";
import { Oval } from "react-loader-spinner";

const initialState = {
  UserId: "",
  UserName: "",
  UserImage: "",
  VideoComment: "",
  VideoId: "",
};

const Comments = ({ VideoId }) => {
  const { data: session } = useSession();
  const { data, loading } = FetchWhereSimple("Comments", VideoId, "VideoId");

  const [form, setForm] = useState(initialState);
  const [emoji, setEmoji] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { UserImage, UserName, VideoComment, UserId } = form;

  useEffect(() => {
    if (session) {
      setForm((prev) => ({
        ...prev,
        UserName: session.user.name,
        UserImage: session.user.image,
        UserId: session.user.id,
        VideoId: VideoId,
      }));
    }
  }, [session]);

  const Comment = () => {
    if (VideoId && UserImage && UserName && VideoComment && UserId) {
      setisLoading(true);
      CommentOnVideo("Comments", form);
      setForm((prevForm) => ({
        ...prevForm,
        VideoComment: "",
      }));
      setisLoading(false);
    } else {
      toast("Missing Something");
      setisLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setForm((prevForm) => ({
      ...prevForm,
      VideoComment: VideoComment + emoji,
    }));
  };

  const Cancel = () => {
    setForm((prevForm) => ({
      ...prevForm,
      VideoComment: "",
    }));
  };

  return (
    <div className="py-4">
      {/* header */}
      <div className="flex gap-7">
        <p className="font-semibold">{data.length} Comments</p>
        <div className="space-x-3 flex items-center">
          <MdOutlineSort className="h-6 w-6" />
          <span>Sort by</span>
        </div>
      </div>
      {/* input */}

      {loading || isLoading ? (
        <div className="flex items-center justify-center">
          <Oval
            height={130}
            width={130}
            color="#3f3f3f"
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#3f3f3f"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
          {session ? (
            <div className="flex gap-6 pt-4">
              <img
                src={session.user.image}
                className="h-12 w-12 rounded-full"
              />
              <div className="">
                <input
                  name="VideoComment"
                  value={VideoComment}
                  className="block outline-none h-8 mb-1 border-b border-b-cardHover text-sm
               focus:border-b-white  bg-white dark:text-white dark:bg-dark desktop:min-w-[1200px]
                lg:min-w-[730px] md:min-w-[650px] min-w-[220px]"
                  placeholder="Add a comment....."
                  onChange={handleChange}
                />
                {VideoComment !== "" && (
                  <div className="flex justify-between pt-2">
                    <div
                      className="cursor-pointer p-2  h-10 w-10 rounded-full hover:bg-lightBorder dark:hover:bg-cardHover"
                      onClick={() => setEmoji(!emoji)}
                    >
                      <BsEmojiLaughing className="h-5 w-5 text-center m-auto mt-0.5" />
                    </div>
                    <div className="space-x-2">
                      <button
                        className="rounded-full px-4 py-2 hover:bg-lightBorder dark:hover:bg-cardHover"
                        onClick={() => Cancel()}
                      >
                        Cancel
                      </button>
                      <button
                        className={` rounded-full px-4 py-3 ${
                          VideoComment === ""
                            ? "bg-darkActive text-cardHover"
                            : "bg-UploadBlue text-black"
                        }`}
                        onClick={() => Comment()}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                )}
                {emoji && (
                  <div className="absolute">
                    <EmojiPicker
                      theme="auto"
                      emojiStyle="google"
                      onEmojiClick={addEmoji}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex gap-6 pt-4 relative"
              onClick={() => signIn("google")}
            >
              <img src="/user.jpg" className="h-12 w-12 rounded-full" />
              <div className="">
                <input
                  className="block outline-none h-8 mb-1 border-b border-b-cardHover text-sm
                focus:border-b-white bg-transparent dark:text-white desktop:min-w-[1200px]
                  xl:min-w-xl lg:min-w-[730px] md:min-w-[650px] min-w-[630px] disabled:cursor-text"
                  placeholder="Add a comment....."
                  disabled
                />
              </div>
            </div>
          )}
          {/* chats */}
          {data.map((comments, id) => (
            <div key={id} className="">
              <div className="flex gap-6 pt-4">
                <img
                  src={comments.UserImage}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="flex gap-2 space-y-2">
                    <p className="lowercase text-base mt-1 font-semibold">
                      @{comments.UserName.replace(/\s/g, "")}
                    </p>
                    <p className="text-sm text-UploadText">
                      <Moment fromNow>{comments.createdAt}</Moment>
                    </p>
                  </div>
                  <div>
                    <p>{comments.VideoComment}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
