import { STREAMER_SERVER } from "@/Helper/consts";
import { useRef, useState } from "react";
import ResolutionSelector from "./ResolutionSelector";
import "./StreamingPage.scss";
import VideoController from "./VideoController";
import { RESOLUTIONS } from "@/Helper/consts";


export default function StreamingPage() {
  const [resolution, setResolution] = useState<string>("8k");
  const vidUrl = `${STREAMER_SERVER}/video/${resolution}`;

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="video-container">
      <video ref={videoRef} className="video-display" src={vidUrl}></video>

      <VideoController setResolution={setResolution}/>
    </div>
  );
}
