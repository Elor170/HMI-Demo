import subprocess


def convert_video(input_file, output_file, resolution):
    # Define the command to execute ffmpeg
    command = [
        'ffmpeg',
        '-i', input_file,
        '-vf', f'scale={resolution}',
        '-c:a', 'copy',
        output_file
    ]

    # Execute the command
    subprocess.run(command, capture_output=True)


if __name__ == "__main__":
    input_video = 'input_video.mp4'  # Replace with your 8k video file path
    resolutions = ['426x240', '640x360', '854x480', '1280x720', '1920x1080', '2560x1440', '3840x2160']

    for resolution in resolutions:
        output_video = f'output_{resolution}.mp4'
        print(f'Converting to {resolution}...')
        convert_video(input_video, output_video, resolution)
        print(f'Conversion to {resolution} complete.\n')
