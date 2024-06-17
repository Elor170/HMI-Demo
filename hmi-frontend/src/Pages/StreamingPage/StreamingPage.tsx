import { STREAMER_SERVER } from "@/Helper/consts";
import { useRef, useState } from "react";
import "./StreamingPage.scss";
import VideoController from "./VideoController";

export default function StreamingPage() {
  const [resolution, setResolution] = useState<string>("8k");
  const vidUrl = `${STREAMER_SERVER}/video/${resolution}`;

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="video-container">
      <video ref={videoRef} className="video-display" src={vidUrl}></video>

      <VideoController videoRef={videoRef} setResolution={setResolution} />
    </div>
  );
}
