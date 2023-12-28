"use client";

import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GetFile, UploadFile } from "@/appwrite/Hooks";
import FullUpload from "./FullUpload";

interface UploadModalProps {
  setModal: (modal: boolean) => void;
  modal: boolean;
}

const UploadModal = ({ setModal, modal }: UploadModalProps) => {
  const [videoAsset, setVideoAsset] = useState<File | string | URL>();
  const [videoAssetName, setVideoAssetName] = useState("");
  const [videoDuration, setVideoDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const videoFile = acceptedFiles[0];
      setVideoAsset(videoFile);
      setVideoAssetName(videoFile.name);

      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.onloadedmetadata = () => {
        const durationInSeconds = Math.floor(videoElement.duration);
        setVideoDuration(durationInSeconds);
      };
      videoElement.src = URL.createObjectURL(videoFile);

      const UploadVideo = await UploadFile(videoFile);
      if (UploadVideo?.$id) {
        const GetUrl = GetFile(UploadVideo?.$id);

        setVideoAsset(GetUrl?.toString());
      }
    },
    [videoAsset]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": [".mp4", ".mkv"],
    },
    maxFiles: 1,
    onDrop,
  });

  const onChange = () => {
    if (modal) {
      setModal(false);
    }
  };

  return (
    <Dialog open={modal} onOpenChange={onChange}>
      <DialogContent className="lg:max-w-5xl max-w-xl">
        <DialogHeader className={"p-4"}>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>
        <Separator />
        {!videoAsset ? (
          <>
            <div className="py-20 space-y-4">
              <div
                className="justify-center items-center flex cursor-pointer"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <div
                  className="justify-center items-center flex dark:bg-UploadCircle bg-lightActive
                    rounded-full h-40 w-40"
                >
                  <MdFileUpload className="h-20 w-20 text-UploadText" />
                </div>
              </div>
              <div className="justify-center items-center flex">
                <div>
                  <p className="ml-14 font-semibold">
                    Drag and drop video file to upload
                  </p>
                  <p className="text-UploadText">
                    Your video will be private until you publish them.
                  </p>
                </div>
              </div>
              <div className="justify-center items-center flex">
                <div
                  className="bg-UploadBlue py-3 px-10 rounded-md text-black font-medium cursor-pointer"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  SELECT FILE
                </div>
              </div>
            </div>
            <div className="items-center p-6 space-y-2 text-xs justify-center flex">
              <div className="text-center">
                <p>
                  By submitting videos to YouTube, you acknowledge that you
                  agree to YouTube's
                  <span className="text-UploadBlue"> Terms of Service </span>
                  and
                  <span className="text-UploadBlue">
                    {" "}
                    Community Guidelines.
                  </span>
                </p>
                <br />
                <p className="ml-32">
                  Please be sure not to violate others' copyright or privacy
                  rights.
                  <span className="text-UploadBlue"> Learn more</span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <FullUpload
            videoUrl={videoAsset}
            uploadPercentage={progress}
            duration={videoDuration}
            setClose={setModal}
            videoAssetName={videoAssetName}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;
