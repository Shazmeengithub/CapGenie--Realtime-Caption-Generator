import os
import whisper
from pydub import AudioSegment
import numpy as np
import soundfile as sf

model = whisper.load_model("base")

def convert_mp4_to_wav(mp4_file_path, wav_file_path):
    video = AudioSegment.from_file(mp4_file_path, format="mp4")
    video = video.set_channels(1)  
    video.export(wav_file_path, format="wav", bitrate="192k") 
    print(f"Converted {mp4_file_path} to {wav_file_path}")

file = input("Enter a Video Name: ")

mp4_file_path = f"Videos/{file}.mp4"
wav_file_path = f"Assets/{file}.wav"

convert_mp4_to_wav(mp4_file_path, wav_file_path)

audio_segment = AudioSegment.from_wav(wav_file_path)
audio = np.array(audio_segment.get_array_of_samples())
sample_rate = audio_segment.frame_rate

if audio_segment.channels == 2:
    audio = audio.reshape((-1, 2)).mean(axis=1)

chunk_size = 5

os.system('cls' if os.name == 'nt' else 'clear')

for start in range(0, len(audio), int(chunk_size * sample_rate)):
    end = min(start + int(chunk_size * sample_rate), len(audio))
    audio_chunk = audio[start:end]
    temp_file_path = "temp_chunk.wav"
    sf.write(temp_file_path, audio_chunk, sample_rate)
    result = model.transcribe(temp_file_path)
    print(result["text"])
