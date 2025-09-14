from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os
import threading
import time
import cv2
import whisper
from pydub import AudioSegment
import numpy as np
import soundfile as sf

app = Flask(__name__)
CORS(app) 
socketio = SocketIO(app, cors_allowed_origins="*") 

model = whisper.load_model("base")

UPLOAD_FOLDER = 'Uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
00
@app.route('/upload-video', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    video_file = request.files['file']
    if video_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    video_path = os.path.join(UPLOAD_FOLDER, video_file.filename)
    video_file.save(video_path)
    socketio.start_background_task(generate_captions, video_path)

    return jsonify({"message": "Video uploaded successfully"})


def generate_captions(video_path):
    wav_file_path = video_path.replace(".mp4", ".wav")
    convert_mp4_to_wav(video_path, wav_file_path)
    transcribe_audio_and_send_captions(wav_file_path)

def convert_mp4_to_wav(mp4_file_path, wav_file_path):
    video = AudioSegment.from_file(mp4_file_path, format="mp4")
    video = video.set_channels(1)
    video.export(wav_file_path, format="wav", bitrate="192k")


def transcribe_audio_and_send_captions(wav_file_path):
    audio_segment = AudioSegment.from_wav(wav_file_path)
    audio_segment = audio_segment.set_frame_rate(16000).set_channels(1) 
    audio = np.array(audio_segment.get_array_of_samples())
    sample_rate = audio_segment.frame_rate

    current_time = 0  
    chunk_size = 5  

    for start in range(0, len(audio), int(chunk_size * sample_rate)):
        end = min(start + int(chunk_size * sample_rate), len(audio))
        audio_chunk = audio[start:end]
        temp_file_path = "temp_chunk.wav"
        sf.write(temp_file_path, audio_chunk, sample_rate)

        try:
            result = model.transcribe(temp_file_path)
            segments = result.get("segments", [])

            for segment in segments:
                start_time = current_time + segment["start"]
                end_time = current_time + segment["end"]
                text = segment["text"]

                socketio.emit('caption', {'start_time': start_time, 'end_time': end_time, 'text': text})
        except Exception as e:
            print(f"Error during transcription: {e}")
            break

        current_time += (end - start) / sample_rate


@socketio.on('connect')
def handle_connect():
    print("Client connected")

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
