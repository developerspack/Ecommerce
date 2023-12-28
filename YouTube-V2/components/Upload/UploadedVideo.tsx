"use client";

import { Oval } from "react-loader-spinner";

interface UploadedVideoProps {
  url: File | string | URL;
  progress: number;
}

const UploadedVideo = ({ url, progress }: UploadedVideoProps) => {
  return (
    <>
      {/* {progress !== 100 ? (
        <div className="flex justify-center items-center">
          <Oval
            height={130}
            width={130}
            color="#3EA6FF"
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#3EA6FF"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : ( */}
      <div className="pr-0">
        <video controls src={typeof url === "string" ? url : ""} />
      </div>
      {/* )} */}
    </>
  );
};

export default UploadedVideo;
