from deepspeech import Model
import numpy as np
import wave
from IPython.display import clear_output
import librosa
import soundfile as sf
import ffmpeg
import os
import time

model_file_path = 'deepspeech-0.9.3-models.pbmm'
lm_file_path = 'deepspeech-0.9.3-models.scorer'
beam_width = 100
lm_alpha = 0.93
lm_beta = 1.18

model = Model(model_file_path)
model.enableExternalScorer(lm_file_path)
model.setScorerAlphaBeta(lm_alpha, lm_beta)
model.setBeamWidth(beam_width)

stream = model.createStream()

def read_wav_file(filename):
    with wave.open(filename, 'rb') as w:
        rate = w.getframerate()
        frames = w.getnframes()
        buffer = w.readframes(frames)
    return buffer, rate

def convert_audio_to_mono_16k(input_audio_path, output_audio_path):
    audio, sr = librosa.load(input_audio_path, sr=16000)
    sf.write(output_audio_path, audio, 16000)

def transcribe_streaming(audio_file):
    buffer, rate = read_wav_file(audio_file)
    offset = 0
    batch_size = 8196 
    final_text = ''
    
    while offset < len(buffer):
        end_offset = offset + batch_size
        chunk = buffer[offset:end_offset]
        data16 = np.frombuffer(chunk, dtype=np.int16)
        
        stream.feedAudioContent(data16)
        text = stream.intermediateDecode()
        clear_output(wait=True)
        os.system('cls')
        print(text+"\n") 

        offset = end_offset
    
    final_text += stream.finishStream()
    return final_text

def convert_mp4_to_wav(video_file, output_audio_file):
    try:
        if os.path.exists(output_audio_file):
            os.remove(output_audio_file)
        if not os.path.exists(video_file):
            print(f"Error: {video_file} does not exist.")
        else:
            ffmpeg.input(video_file).output(output_audio_file).run()
            print(f"Successfully converted {video_file} to {output_audio_file}")
    except Exception as e:
        print(f"Error: {e}")

file = input("Enter file name: ")

video_file = f'Videos/{file}.mp4'

output_audio_file = f'./Assets/{file}.wav' 
convert_mp4_to_wav(video_file, output_audio_file)
converted_audio_path = output_audio_file.replace('.wav', '_converted.wav')
print(converted_audio_path)
convert_audio_to_mono_16k(output_audio_file, converted_audio_path)
transcribe_streaming(converted_audio_path)