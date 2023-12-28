"use client";

import { FileWithPath, useDropzone } from "react-dropzone";
import { BiCloudUpload } from "react-icons/bi";
import { useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { GetFile, UploadFile } from "@/appwrite/Hooks";

interface ThumbnailUploadProps {
  setThumbnail: (image: string | URL | undefined | null) => void;
  thumbnail: string | URL | undefined | null;
  onChange: (value: string | URL | undefined | null) => void;
  disabled: boolean;
}

const ThumbnailUpload = ({
  setThumbnail,
  thumbnail,
  disabled,
  onChange,
}: ThumbnailUploadProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onChange(thumbnail);
  }, [thumbnail]);

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    setLoading(true);
    const file = acceptedFiles[0];
    const UploadVideo = await UploadFile(file);
    if (UploadVideo?.$id) {
      const GetUrl = GetFile(UploadVideo?.$id);
      setThumbnail(GetUrl?.toString());
    }
    setLoading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", "jfif"],
    },
    maxFiles: 1,
    onDrop,
  });

  console.log(thumbnail);

  return (
    <div>
      {" "}
      <h2 className="font-bold text-base">Thumbnail</h2>
      <p className="text-xs text-UploadText">
        Select or upload a picture that shows what's in your video. A good
        thumbnail stands out and draws viewers' attention.
        <span className="text-UploadBlue"> Learn more</span>
        <div className="md:flex block space-y-2 justify-between">
          <div
            className="flex items-center justify-center w-56"
            {...getRootProps()}
          >
            {loading ? (
              <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-dark hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-transparent mt-2 text-center p-1">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <BiCloudUpload className="h-7 w-7" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input {...getInputProps()} disabled={disabled} />
              </div>
            )}
          </div>
          <div className="">
            <img
              src={
                typeof thumbnail === "string"
                  ? thumbnail
                  : "https://www.snapon.co.za/images/thumbs/default-image_550.png"
              }
              alt="thumbnail"
              className="h-32 w-32 rounded-lg"
            />
          </div>
        </div>
      </p>
    </div>
  );
};

export default ThumbnailUpload;
