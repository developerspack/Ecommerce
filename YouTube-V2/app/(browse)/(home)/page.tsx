"use client";

// @ts-ignore
import HoverVideoPlayer from "react-hover-video-player";
import { Player } from "react-tuby";
export default function Home() {
  return (
    <div>
      home
      {/* <HoverVideoPlayer
        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        pausedOverlay={
          <img
            src="https://i.ytimg.com/vi/l7TxwBhtTUY/hq720_live.jpg?sqp=CNjfsYAG-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLAmVNjMQzuOHHknmocydqjEQyedCg"
            alt=""
            style={{
              // Make the image expand to cover the video's dimensions
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        }
        loadingOverlay={
          <div className="loading-overlay">
            <div className="loading-spinner" />
          </div>
        }
        controls
      /> */}
      {/* <Player
        src={
          "https://cloud.appwrite.io/v1/storage/buckets/657fed675455226d5d04/files/65836c8d63716000b369/view?project=657430f30a00d5116879&mode=admin"
        }
        poster="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/poster.png"
      /> */}
    </div>
  );
}
