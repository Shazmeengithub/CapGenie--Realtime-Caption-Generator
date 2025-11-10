import os
import cv2
import whisper
from pydub import AudioSegment
import numpy as np
import soundfile as sf
import threading
import queue
import time
from pydub.playback import play

model = whisper.load_model("base")

def convert_mp4_to_wav(mp4_file_path, wav_file_path):
    video = AudioSegment.from_file(mp4_file_path, format="mp4")
    video = video.set_channels(1)
    video.export(wav_file_path, format="wav", bitrate="192k")
    print(f"Converted {mp4_file_path} to {wav_file_path}")

def wrap_text(text, font, font_scale, thickness, max_width):
    """Wrap the text to fit within the max width."""
    lines = []
    words = text.split()
    line = ""
    
    for word in words:
        # Create a temporary line with the new word
        temp_line = f"{line} {word}" if line else word
        text_size = cv2.getTextSize(temp_line, font, font_scale, thickness)[0]
        
        # If the line exceeds max width, start a new line
        if text_size[0] <= max_width:
            line = temp_line
        else:
            if line:
                lines.append(line)
            line = word
            
    if line:
        lines.append(line)
    
    return lines

def play_audio(wav_file_path):
    """Play the audio file."""
    audio = AudioSegment.from_wav(wav_file_path)
    play(audio)

def play_video_with_captions(mp4_file_path, caption_queue):
    cap = cv2.VideoCapture(mp4_file_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {mp4_file_path}")
        return

    # Set up the OpenCV window size
    cv2.namedWindow("Video Playback with Captions", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("Video Playback with Captions", 1280, 720)  # Resize to a larger window

    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.5  # Increase font size for better visibility
    font_color = (255, 255, 255)
    thickness = 1  # Increase thickness for clearer text
    bg_color = (0, 0, 0)  # Background color for text

    fps = cap.get(cv2.CAP_PROP_FPS)
    delay = 1 / fps  # Delay between frames

    current_caption = ""
    caption_end_time = 0  # Timestamp to track when the current caption ends

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Get the current frame timestamp
        current_time = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0  # In seconds

        # Check if there is a new caption to display
        if not caption_queue.empty():
            start_time, end_time, text = caption_queue.queue[0]  # Peek at the first caption
            if start_time <= current_time <= end_time:
                current_caption = text
                caption_end_time = end_time
            elif current_time > end_time:
                caption_queue.get()  # Remove caption from queue once it's expired
                current_caption = ""  # Clear caption after its time has passed

        # Wrap the caption text
        if current_caption:
            max_width = frame.shape[1] - 40  # Ensure there is a margin
            wrapped_text = wrap_text(current_caption, font, font_scale, thickness, max_width)

            # Calculate position for text
            y_offset = frame.shape[0] - 50
            for line in wrapped_text:
                text_size = cv2.getTextSize(line, font, font_scale, thickness)[0]
                text_x = (frame.shape[1] - text_size[0]) // 2  # Center the text horizontally
                cv2.rectangle(frame, (text_x - 10, y_offset - text_size[1] - 10),
                              (text_x + text_size[0] + 10, y_offset + 10), bg_color, -1)
                cv2.putText(frame, line, (text_x, y_offset), font, font_scale, font_color, thickness)
                y_offset += text_size[1] + 10  # Move down for next line

        cv2.imshow("Video Playback with Captions", frame)

        # Press 'q' to exit video playback
        if cv2.waitKey(int(delay * 1000)) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def transcribe_audio_and_queue_captions(wav_file_path, chunk_size, caption_queue):
    audio_segment = AudioSegment.from_wav(wav_file_path)
    audio = np.array(audio_segment.get_array_of_samples())
    sample_rate = audio_segment.frame_rate

    if audio_segment.channels == 2:
        audio = audio.reshape((-1, 2)).mean(axis=1)

    current_time = 0  # Keeps track of the current audio timestamp

    for start in range(0, len(audio), int(chunk_size * sample_rate)):
        end = min(start + int(chunk_size * sample_rate), len(audio))
        audio_chunk = audio[start:end]
        temp_file_path = "temp_chunk.wav"
        sf.write(temp_file_path, audio_chunk, sample_rate)

        result = model.transcribe(temp_file_path)
        segments = result["segments"]

        for segment in segments:
            # Adjust timestamps by adding the current time offset
            start_time = current_time + segment["start"]
            end_time = current_time + segment["end"]
            text = segment["text"]
            caption_queue.put((start_time, end_time, text))

        # Update current time to the end of the processed chunk
        current_time += (end - start) / sample_rate

file = input("Enter a Video Name: ")

mp4_file_path = f"Videos/{file}.mp4"
wav_file_path = f"Assets/{file}.wav"

convert_mp4_to_wav(mp4_file_path, wav_file_path)

# Create a queue for captions
caption_queue = queue.Queue()

# Start the transcription in a separate thread
transcription_thread = threading.Thread(
    target=transcribe_audio_and_queue_captions, 
    args=(wav_file_path, 5, caption_queue)
)
transcription_thread.start()

# Start audio playback in a separate thread
audio_thread = threading.Thread(target=play_audio, args=(wav_file_path,))
audio_thread.start()

# Play the video with captions
play_video_with_captions(mp4_file_path, caption_queue)

# Wait for transcription and audio to finish
transcription_thread.join()
audio_thread.join()
