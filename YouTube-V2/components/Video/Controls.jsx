"use client";

import { BiExitFullscreen } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi2";
import { IoPause, IoPlay, IoSettingsSharp } from "react-icons/io5";
import {
  MdFullscreen,
  MdOutlineRectangle,
  MdPictureInPictureAlt,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { RiSpeedUpFill } from "react-icons/ri";
import { TbMathGreater } from "react-icons/tb";

import { format } from "@/Hooks/Hooks";
import { speedOptions } from "@/lib/constants";

const Controls = ({
  timelineContainerRef,
  handleTimelineMouseDown,
  handleTimelineMouseUp,
  handleTimelineMouseMove,
  bufferedTimePercent,
  currentTime,
  duration,
  handleTogglePlay,
  HandleMute,
  ToggleSpeed,
  HandleVolumeChange,
  volume,
  isVideoPlaying,
  muted,
  settings,
  fullscreen,
  ToggleSetting,
  HandleTogglePiP,
  HandleFullScreenToggle,
  speedTab,
  currentSpeed,
  speed,
  HandleSpeedChange,
}) => {
  return (
    <>
      {/* Controls */}
      <div
        className="absolute bottom-0 left-3 right-3 text-white z-50 opacity-0 group-hover/item:opacity-100
         transition-opacity duration-200 px-2"
      >
        <div
          className="cursor-pointer mb-2"
          ref={timelineContainerRef}
          onMouseDown={handleTimelineMouseDown}
          onMouseUp={handleTimelineMouseUp}
          onMouseMove={handleTimelineMouseMove}
        >
          <div className="absolute left-0 bottom-0 top-0 w-full bg-gray-500 pl-2 pr-2 h-[3px] px-2"></div>
          <div
            className="absolute left-0 bottom-0 top-0 w-full bg-gray-300 pl-2 pr-2 h-[3px] px-2"
            style={{
              width: `${bufferedTimePercent}%`,
            }}
          ></div>
          <div
            className="absolute left-0 bottom-0 top-0 h-[3px] bg-red-600 px-2"
            style={{
              width: `${(currentTime / duration) * 100}%`,
            }}
          ></div>
        </div>

        <div className="flex justify-between">
          <div className="flex p-1 items-center gap-2">
            <button onClick={() => handleTogglePlay()}>
              {isVideoPlaying ? (
                <IoPause className="h-8 w-8" />
              ) : (
                <IoPlay className="h-8 w-8" />
              )}
            </button>
            <div className="flex items-center group/volume">
              <button onClick={() => HandleMute()} className="">
                {muted ? (
                  <MdVolumeOff className="h-8 w-8" />
                ) : (
                  <MdVolumeUp className="h-8 w-8" />
                )}
              </button>

              <input
                type="range"
                min="0"
                className="hidden group-hover/volume:block cursor-pointer accent-white
                   [&::-webkit-slider-runnable-track]:h-[5px] [&::-webkit-slider-thumb]:-mt-[6px]"
                max="1"
                defaultValue={0}
                step="any"
                value={volume}
                onChange={HandleVolumeChange}
              />
            </div>
            <div className="flex">
              <p>{format(currentTime)}</p>
              <p>/</p>
              <p>{format(duration)}</p>
            </div>
          </div>

          {/* settings */}
          {settings && (
            // <div className="relative z-20">
            <div
              className="flex mt-1 absolute cursor-pointer p-3 dark:hover:bg-hover hover:bg-lightBorder bg-secondary
                rounded-xl gap-4 right-32 bottom-16"
              style={{ pointerEvents: "all" }}
              onClick={() => ToggleSpeed()}
            >
              <span className="flex gap-3">
                <RiSpeedUpFill className="h-6 w-6" />
                <p>Playback speed</p>
              </span>
              <span className="flex gap-1">
                <p>{currentSpeed}</p>
                <TbMathGreater className="h-5 w-5 ml-auto mt-1" />
              </span>
            </div>
            // </div>
          )}
          {/* Speed Value */}
          {speedTab && (
            <div className="absolute right-32 bottom-[440px] h-full w-[260px] rounded-xl">
              <div className="bg-secondaryDark rounded-xl">
                <div className="flex gap-2 px-1 py-2 text-lg font-semibold items-center border-b-2 dark:border-darkBorder">
                  <div
                    className="dark:hover:bg-hover cursor-pointer hover:bg-lightBorder p-3 rounded-full"
                    onClick={() => ToggleSpeed()}
                  >
                    <BsArrowLeft className="h-6 w-6" />
                  </div>
                  Playback speed
                </div>
                {speedOptions.map((option) => (
                  <p
                    key={option.value}
                    onClick={() => HandleSpeedChange(option.value)}
                    className="flex mt-1 cursor-pointer p-2 dark:hover:bg-hover hover:bg-lightBorder rounded-xl"
                  >
                    {speed === option.value && (
                      <HiOutlineCheck className="h-6 w-6" />
                    )}
                    <p
                      className={`${speed === option.value ? "ml-2" : "ml-8"}`}
                    >
                      {option.label}
                    </p>
                  </p>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 items-center">
            <IoSettingsSharp
              className="h-6 w-6 cursor-pointer"
              onClick={() => ToggleSetting()}
            />
            <MdPictureInPictureAlt
              className="h-6 w-6 cursor-pointer"
              onClick={() => HandleTogglePiP()}
            />
            <MdOutlineRectangle className="h-6 w-6 cursor-pointer" />

            {fullscreen ? (
              <BiExitFullscreen
                className="h-8 w-8 cursor-pointer"
                onClick={() => HandleFullScreenToggle()}
              />
            ) : (
              <MdFullscreen
                className="h-8 w-8 cursor-pointer"
                onClick={() => HandleFullScreenToggle()}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
