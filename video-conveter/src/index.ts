import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";

const arg = process.argv[2];
if (!arg || arg === "") {
  console.error("Please provide path argument");
  process.exit(0);
}

const inputVideoPath = path.join(process.cwd(), arg);
if (!fs.existsSync(inputVideoPath) || path.extname(inputVideoPath) !== ".mp4") {
  console.error(
    "Invalid path argument provided. Please provide a valid mp4 file"
  );
  process.exit(0);
}

// Array of target resolutions
const resolutions = [
  "3840x2160",
  "2560x1440",
  "1920x1080",
  "1280x720",
  "854x480",
  "640x360",
  "426x240",
];

function getParentDirectoryFullPath(filePath: string) {
  // Get the parent directory path
  const parentDir = path.dirname(filePath);

  // Get the full path of the parent directory
  const fullPath = path.resolve(parentDir);

  return fullPath;
}

// Function to downscale video to a specified resolution
function downscaleVideo(
  inputPath: string,
  outputPath: string,
  resolution: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .videoFilters(`scale=${resolution}`)
      .output(outputPath)
      .on("end", () => {
        console.log(`Video downscaled to ${resolution}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error downsizing video: ${err.message}`);
        reject(err);
      })
      .run();
  });
}

// Function to downscale video to all specified resolutions concurrently
async function downscaleToAllResolutions(inputPath: string): Promise<void> {
  const promises = resolutions.map((resolution) => {
    const outputPath = path.join(
      getParentDirectoryFullPath(inputVideoPath),
      `${resolution}.mp4`
    );
    return downscaleVideo(inputPath, outputPath, resolution);
  });
  await Promise.all(promises);
}

// Call the function with the input video path
downscaleToAllResolutions(inputVideoPath)
  .then(() => console.log("All resolutions processed successfully"))
  .catch((err) => console.error("Error processing resolutions:", err));
