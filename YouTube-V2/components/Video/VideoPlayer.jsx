"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Oval } from "react-loader-spinner";
import screenfull from "screenfull";
import { doc, updateDoc } from "firebase/firestore";

import { speedOptions } from "@/lib/constants";
import Controls from "./Controls";
import { db } from "@/lib/firebase";

const VideoPlayer = ({ VideoUrl, ChannelImage, Tumbnail, id, views }) => {
  const [play, setPlay] = useState(true);
  const [volume, setVolume] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [speed, setSpeed] = useState(1);
  const [settings, setSettings] = useState(false);
  const [speedTab, setSpeedTab] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // update view count
  const handleVideoPlay = async () => {
    await updateDoc(doc(db, "video", id), {
      Views: views + 1,
    });
  };

  const videoRef = useRef(null);
  const playerContainer = useRef();
  const timelineContainerRef = useRef(null);
  const isScrubbing = useRef(false);

  const isVideoPlaying = videoRef.current && !videoRef.current.paused;

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tagName = document.activeElement.tagName.toLowerCase();
      if (tagName === "input") return;

      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return;
        case "k":
          handleTogglePlay();
          break;
        case "spacebar":
          handleTogglePlay();
          break;
        case "arrowleft":
        case "j":
          HandleSkipBackward();
          break;
        case "arrowright":
        case "l":
          HandleSkipForward();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    const updateTime = () => {
      if (videoElement && videoElement.currentTime) {
        setCurrentTime(videoElement.currentTime);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(videoElement.duration);
    };
    setDuration(videoElement.duration);
    videoElement.addEventListener("timeupdate", updateTime);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("durationchange", handleDurationChange);

    return () => {
      videoElement.removeEventListener("timeupdate", updateTime);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  useEffect(() => {}, [muted, volume, play, duration, isLoading]);

  const HandleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setMuted(newVolume === "0");
  };

  const handleTogglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setPlay(!play);
  };

  const HandleFullScreenToggle = () => {
    screenfull.toggle(playerContainer.current);
    setFullscreen(!fullscreen);
  };

  const HandleMute = () => {
    setMuted(!muted);
    if (muted) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const HandleTogglePiP = () => {
    if (document.pictureInPictureElement === videoRef.current) {
      document.exitPictureInPicture();
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  const handleTimelineMouseDown = () => {
    isScrubbing.current = true;
    videoRef.current.pause();
  };

  const handleTimelineMouseUp = () => {
    if (isScrubbing.current) {
      isScrubbing.current = false;
      videoRef.current.play();
    }
  };

  const handleTimelineMouseMove = (e) => {
    if (!isScrubbing.current) return;

    const rect = timelineContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const timelineWidth = rect.width;
    const scrubTime = (clickX / timelineWidth) * duration;

    videoRef.current.currentTime = scrubTime;
  };

  const HandleSkipBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const HandleSkipForward = () => {
    videoRef.current.currentTime += 5;
  };

  // buffered time
  const getTotalBufferedDuration = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      let totalBuffered = 0;
      for (let i = 0; i < videoRef.current.buffered.length; i++) {
        totalBuffered +=
          videoRef.current.buffered.end(i) - videoRef.current.buffered.start(i);
      }
      return totalBuffered;
    }
    return 0;
  };
  const bufferedTimePercent = (getTotalBufferedDuration() / duration) * 100;

  // video speed
  const HandleSpeedChange = (value) => {
    const newSpeed = parseFloat(value);
    setSpeed(newSpeed);
    videoRef.current.playbackRate = newSpeed;
  };

  const currentSpeed =
    speedOptions.find((option) => option.value === speed)?.label || "Unknown";

  // toggle settings
  const ToggleSetting = () => {
    setSettings(!settings);
    setSpeedTab(false);
  };
  // toggle settings
  const ToggleSpeed = () => {
    setSpeedTab(!speedTab);
    setSettings(!settings);
  };

  return (
    <>
      <div
        className="relative w-full desktop:max-w-[1300px]  xl:max-w-[800px] lg:max-w-[1000px] flex group/item z-10"
        ref={playerContainer}
      >
        {isLoading && (
          <div className="absolute top-[35%] lg:top-[40%] right-[40%] lg:right-[45%]">
            <Oval
              height={80}
              width={80}
              color="#fff"
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#fff"
              strokeWidth={3}
              strokeWidthSecondary={3}
            />
          </div>
        )}

        {getTotalBufferedDuration() === 0 && (
          <>
            <Image
              height={500}
              width={500}
              src={Tumbnail}
              className="absolute w-full h-full"
            />
            <div className="absolute top-[35%] lg:top-[40%] right-[40%] lg:right-[45%]">
              <Oval
                height={80}
                width={80}
                color="#fff"
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#fff"
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            </div>
          </>
        )}

        <div className="absolute right-0 bottom-2 group-hover/item:bottom-16 mr-3">
          <img src={ChannelImage} alt="" className="h-10 w-10" />
        </div>

        {/* controls */}
        <Controls
          timelineContainerRef={timelineContainerRef}
          handleTimelineMouseDown={handleTimelineMouseDown}
          handleTimelineMouseUp={handleTimelineMouseUp}
          handleTimelineMouseMove={handleTimelineMouseMove}
          bufferedTimePercent={bufferedTimePercent}
          currentTime={currentTime}
          duration={duration}
          handleTogglePlay={handleTogglePlay}
          HandleMute={HandleMute}
          volume={volume}
          HandleVolumeChange={HandleVolumeChange}
          ToggleSpeed={ToggleSpeed}
          isVideoPlaying={isVideoPlaying}
          muted={muted}
          settings={settings}
          fullscreen={fullscreen}
          HandleTogglePiP={HandleTogglePiP}
          ToggleSetting={ToggleSetting}
          HandleFullScreenToggle={HandleFullScreenToggle}
          HandleSpeedChange={HandleSpeedChange}
          currentSpeed={currentSpeed}
          speedTab={speedTab}
          speed={speed}
        />

        {/* Video */}
        <video
          onClick={() => handleTogglePlay()}
          onWaiting={() => setIsLoading(true)}
          onCanPlayThrough={() => setIsLoading(false)}
          onPlay={handleVideoPlay}
          src={VideoUrl}
          className="w-full"
          ref={videoRef}
          autoPlay
          muted={muted}
        />
      </div>
    </>
  );
};

export default VideoPlayer;
