import { STREAMER_SERVER } from "@/Helper/consts";
import { useState } from "react";
import ReactPlayer from "react-player";
import ResolutionSelector from "./ResolutionSelector";

const resolutionsArr = [
  "140p",
  "240p",
  "340p",
  "420p",
  "720p",
  "1080p",
  "2k",
  "4k",
  "8k",
];

export default function StreamingPage() {
  const [resolution, setResolution] = useState<string>("8k");
  const vidUrl = `${STREAMER_SERVER}/video/${resolution}`;

  return (
    <div>
      <ReactPlayer url={vidUrl} controls />

      <ResolutionSelector
        setResolution={setResolution}
        allResolutions={resolutionsArr}
      />
    </div>
  );
}
